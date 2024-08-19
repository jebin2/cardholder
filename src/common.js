const processCardData = async (type, content) => {
    try {
        const netlifyUrl = window.location.host.includes("localhost") ? "http://localhost:8888" : "https://jeapis.netlify.app/";
        if(localStorage.getItem("googleDriveSyncEnabled") === "true") {
            const response = await fetch(netlifyUrl + '/.netlify/functions/getCardHolderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    access_token: localStorage.getItem("access_token"),
                    refresh_token: localStorage.getItem("refresh_token"),
                    content: content
                })
            });
    
            if (!response.ok) {
                // Reject the promise if the response status is not OK (e.g., 4xx or 5xx)
                return Promise.reject(new Error("Failed to update card data. Server returned status: " + response.status));
            }
    
            const data = await response.json();
    
            if (data.content) {
                // Update the local storage with the new tokens and card data
                if(type === "delete") {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("googleDriveSyncEnabled");
                } else {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    localStorage.setItem("card_data", JSON.stringify(data.content));
                }
    
                // Resolve the promise with the updated content
                return Promise.resolve(data.content);
            }
    
            // If there's no content, resolve with an empty array
            return Promise.resolve([]);
        } else {
            switch(type) {
                case "fetch":
                    let newContent = [];
                    if(localStorage.hasOwnProperty("card_data")) {
                        newContent = JSON.parse(localStorage.getItem("card_data"));
                    }
                    localStorage.setItem("card_data", JSON.stringify(newContent));
                    break;
                case "update":
                    localStorage.setItem("card_data", JSON.stringify(content));
                    break;
            }
            return Promise.resolve(JSON.parse(localStorage.getItem("card_data")));
        }
    } catch (e) {
        // Reject the promise with the caught error
        return Promise.reject(new Error("Error in updating card data: " + e.message));
    }
};
const encryptData = (data, encryptionKey, CryptoJS) => CryptoJS.AES.encrypt(data, encryptionKey).toString();
const decryptData = (encryptedData, encryptionKey, CryptoJS) => CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);
module.exports = {
    processCardData,
    encryptData,
    decryptData
};