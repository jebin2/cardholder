const processCardData = async (type, content) => {
    try {
        const netlifyUrl = window.location.host.includes("localhost") 
            ? "http://localhost:8888" 
            : "https://jeapis.netlify.app";

        if (localStorage.getItem("googleDriveSyncEnabled") === "true") {
            const response = await fetch(`${netlifyUrl}/.netlify/functions/getCardHolderData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    access_token: localStorage.getItem("access_token"),
                    refresh_token: localStorage.getItem("refresh_token"),
                    content
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to update card data. Server returned status: ${response.status}`);
            }

            const data = await response.json();

            if (data.content) {
                if (type === "delete") {
                    ["access_token", "refresh_token", "googleDriveSyncEnabled"].forEach(key => localStorage.removeItem(key));
                } else {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                }
                return offlineData("upsert", content);
            }
            return [];
        } else {
            return offlineData(type, content);
        }
    } catch (e) {
        console.error("Error in processCardData:", e);
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
                cardObj.is_deleted = false;
                await upsertData(cardHolderDB, cardObj);
            }
            break;
        case "delete":
            cardObj.is_deleted = true;
            await upsertData(cardHolderDB, cardObj);
            // await deleteData(cardHolderDB, cardObj);
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
        cardObj.is_synced = false;
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
            cardObj.is_synced = false;
            cardObj.is_deleted = false;
            const request = objectStore.put(cardObj);
            request.onsuccess = () => results.push(cardObj);
            request.onerror = event => console.error("Error upserting card:", event.target.error);
        });

        transaction.oncomplete = () => resolve(results);
        transaction.onerror = event => reject(event.target.error);
    });
};

const deleteData = (db, cardObj) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["carddetails"], "readwrite");
        const objectStore = transaction.objectStore("carddetails");
        cardObj.is_synced = false;
        const request = objectStore.delete(cardObj.key);
        request.onsuccess = () => resolve(cardObj);
        request.onerror = event => reject(event.target.error);
    });
};

const encryptData = (data, encryptionKey, CryptoJS) => CryptoJS.AES.encrypt(data, encryptionKey).toString();
const decryptData = (encryptedData, encryptionKey, CryptoJS) => CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);

module.exports = {
    processCardData,
    encryptData,
    decryptData
};