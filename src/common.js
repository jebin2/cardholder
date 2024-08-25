let timeoutId = null;

function syncToServer() {
    if(!timeoutId) {
        timeoutId = setTimeout(async () => {
            await processCardData("pushToServer");
            timeoutId = null;
        }, 1000);
    }
}
const processCardData = async (type, content) => {
    try {
        const netlifyUrl = window.location.host.includes("localhost")
            ? "http://localhost:8888"
            : "https://jeapis.netlify.app";
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        
        if(accessToken && timeoutId == null) {
            syncToServer();
        }
        if ((type === "pushToServer" || type === "deleteFromServer") && !accessToken) {
            type = type === "pushToServer" ? "fetch" : "delete";
        }

        if (type === "pushToServer" || type === "deleteFromServer") {
            const cardHolderDB = await openDatabase();
            const cardDetails = type === "pushToServer" ? await getAllData(cardHolderDB) : null;

            const response = await fetch(`${netlifyUrl}/.netlify/functions/getCardHolderData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: type === "pushToServer" ? "create" : "delete",
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    content: cardDetails
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to update card data. Server returned status: ${response.status}`);
            }

            const data = await response.json();

            if (data.content) {
                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                }

                data.content.forEach(con => {
                    con.is_synced = type === "pushToServer";
                });
                await truncateIndexedDB();
                return offlineData("upsert", data.content);
            }
            return [];
        } else {
            return offlineData(type, content);
        }
    } catch (e) {
        return offlineData(type, content);
    }
};

const offlineData = async (type, cardObj) => {
    const cardHolderDB = await openDatabase();
    switch (type) {
        case "upsert":
            if (Array.isArray(cardObj)) {
                await batchUpsertData(cardHolderDB, cardObj);
            } else {
                await upsertData(cardHolderDB, cardObj);
            }
            break;
        case "delete":
            await upsertData(cardHolderDB, cardObj);
            break;
    }
    const cardDetails = await getAllData(cardHolderDB);
    return cardDetails.filter(x => !x.is_deleted);
};

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const connection = indexedDB.open("CardHolder", 2);
        connection.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("carddetails", { keyPath: "key" });
            const indices = ["key", "color", "code", "validtill", "cvv", "name", "brand", "network", "network_type", "is_synced", "is_deleted"];
            indices.forEach(index => objectStore.createIndex(index, index, { unique: index === "key" }));
        };
        connection.onsuccess = event => resolve(event.target.result);
        connection.onerror = event => reject(event.target.error);
    });
};

const getAllData = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["carddetails"], "readonly");
        const objectStore = transaction.objectStore("carddetails");
        const request = objectStore.getAll();
        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
};

const upsertData = (db, cardObj) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["carddetails"], "readwrite");
        const objectStore = transaction.objectStore("carddetails");
        const request = objectStore.put(cardObj);
        request.onsuccess = () => resolve(cardObj);
        request.onerror = event => reject(event.target.error);
    });
};

const batchUpsertData = (db, cardObjects) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["carddetails"], "readwrite");
        const objectStore = transaction.objectStore("carddetails");

        const results = [];

        cardObjects.forEach(cardObj => {
            const request = objectStore.put(cardObj);
            request.onsuccess = () => results.push(cardObj);
            request.onerror = event => console.error("Error upserting card:", event.target.error);
        });

        transaction.oncomplete = () => resolve(results);
        transaction.onerror = event => reject(event.target.error);
    });
};

const truncateIndexedDB = async () => {
    return new Promise(async (resolve, reject) => {
        const cardHolderDB = await openDatabase();

        const transaction = cardHolderDB.transaction(["carddetails"], "readwrite");

        const objectStore = transaction.objectStore("carddetails");

        const objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = () => resolve('Database truncated successfully');

        objectStoreRequest.onerror = (event) => reject(`Error opening database: ${event.target.error}`);
    });
};


const encryptData = (data, encryptionKey, CryptoJS) => CryptoJS.AES.encrypt(data, encryptionKey).toString();
const decryptData = (encryptedData, encryptionKey, CryptoJS) => CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);

module.exports = {
    processCardData,
    encryptData,
    decryptData,
    truncateIndexedDB
};