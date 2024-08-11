
function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}
function decryptData(encryptedData, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
function createCard(cardData) {
    const { color, code, name, cvv, expiry, type, branch, label } = cardData;

    const cardHTML = `
        <div class="card-container">
            <div class="card">
                <div class="card-front" style="background-color: ${color};">
                    <div class="card-branch">${branch}</div>
                    <div class="card-number" data-value="${code}">**** **** **** ****</div>
                    <div>
                        <div class="card-name" data-value="${name}">***** *****</div>
                        <div class="card-expiry" data-value="${expiry}">**/**</div>
                    </div>
                    <svg class="open ai-icon hide" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="close ai-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.5 4.5L19.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="card-type">${type}</div>
                    <div class="card-label">${label}</div>
                    <svg class="card-flip" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="card-back">
                    <svg class="open ai-icon hide" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="close ai-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.5 4.5L19.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="card-barcode"></div>
                    <div class="card-cvv" data-value="${cvv}">CVV: ***</div>
                    <svg class="card-flip" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    `;

    return cardHTML;
}

function renderCards(cardsData) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = cardsData.map(createCard).join('');
    document.querySelectorAll('.card-flip').forEach(arrow => {
        arrow.addEventListener('click', function () {
            this.closest('.card').classList.toggle('flipped');
        });
    });

    document.querySelectorAll('.ai-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            let self = e.target.closest("svg");
            let cardNumber;
            let cardName;
            let cardExpiry;
            let cardCVV;
            if (self.parentElement.classList.contains("card-front")) {
                cardNumber = self.parentElement.querySelector(".card-number");
                cardName = self.parentElement.querySelector(".card-name");
                cardExpiry = self.parentElement.querySelector(".card-expiry");
            } else {
                cardCVV = self.parentElement.querySelector(".card-cvv");
            }
            if (self.classList.contains("close")) {
                self.classList.toggle('hide');
                self.previousElementSibling.classList.toggle('hide');
                cardNumber ? cardNumber.textContent = decryptData(cardNumber.dataset.value, 'jebin') : "";
                cardName ? cardName.textContent = decryptData(cardName.dataset.value, 'jebin') : "";
                cardExpiry ? cardExpiry.textContent = decryptData(cardExpiry.dataset.value, 'jebin') : "";
                cardCVV ? cardCVV.textContent = "CVV: " + decryptData(cardCVV.dataset.value, 'jebin') : "";
            } else {
                self.classList.toggle('hide');
                self.nextElementSibling.classList.toggle('hide');
                cardNumber ? cardNumber.textContent = "**** **** **** ****" : "";
                cardName ? cardName.textContent = "***** *****" : "";
                cardExpiry ? cardExpiry.textContent = "**/**" : "";
                cardCVV ? cardCVV.textContent = "CVV: ***" : "";
            }
        });
    });
}

function showPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('hide');
    setTimeout(() => {
        popupOverlay.classList.add('show');
    }, 10);
}

function closePopupHandler() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('show');
    setTimeout(() => {
        popupOverlay.classList.add('hide');
    }, 300);
}
function addCard() {
    return true;
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                const cardsData = [
                    { color: '#4a90e2', code: encryptData('1234 5678 9012 3456', 'jebin'), name: encryptData('John Doe', 'jebin'), cvv: encryptData('123', 'jebin'), expiry: encryptData('12/25', 'jebin'), type: 'Visa', branch: 'HDFC', label: 'Credit' },
                    { color: '#e74c3c', code: encryptData('9876 5432 1098 7654', 'jebin'), name: encryptData('Jane Smith', 'jebin'), cvv: encryptData('456', 'jebin'), expiry: encryptData('06/24', 'jebin'), type: 'MasterCard', branch: 'SBI', label: 'Debit' },
                    { color: '#2ecc71', code: encryptData('1111 2222 3333 4444', 'jebin'), name: encryptData('Bob Johnson', 'jebin'), cvv: encryptData('789', 'jebin'), expiry: encryptData('09/26', 'jebin'), type: 'Amex', branch: 'HDFC', label: 'Credit' },
                    { color: 'mediumpurple', code: encryptData('5555 6666 7777 8888', 'jebin'), name: encryptData('Alice Brown', 'jebin'), cvv: encryptData('321', 'jebin'), expiry: encryptData('03/25', 'jebin'), type: 'Discover', branch: 'SBI', label: 'Debit' },
                    { color: 'black', code: encryptData('5555 6666 7777 8888', 'jebin'), name: encryptData('Alwin Grace', 'jebin'), cvv: encryptData('567', 'jebin'), expiry: encryptData('04/27', 'jebin'), type: 'Rupay', branch: 'DBS', label: 'Debit' }
                ];
                renderCards(cardsData);
                document.getElementById('cardForm').addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent the form from submitting normally
                    closePopupHandler();
                });
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
