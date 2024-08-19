import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CreditCardForm from './CreditCardForm';
import ColorPicker from './ColorPicker';
import CryptoJS from 'crypto-js';
import { processCardData, encryptData, decryptData } from './common';

export default function AddCardDialog ({ backgroundColor, isAddCardDialogOpen, setIsAddCardDialogOpen, viewMode, cardsData, setCardsData, selectedCardIndex, encryptionKey, setIsLoading, setErrorMessage, setKeyDuration }) {
    const [cardDetails, setCardDetails] = useState({
        color: selectedCardIndex !== -1 ? cardsData[selectedCardIndex].color : "black",
        code: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].code, encryptionKey, CryptoJS) : "",
        name: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].name, encryptionKey, CryptoJS) : "",
        cvv: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].cvv, encryptionKey, CryptoJS) : "",
        expiry: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].expiry, encryptionKey, CryptoJS) : "",
        network: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].network, encryptionKey, CryptoJS) : "",
        brand: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].brand, encryptionKey, CryptoJS) : "",
        network_type: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].network_type, encryptionKey, CryptoJS) : ""
    });
    const label = {
        color: "Color", code: "Number", name: "Name", cvv: "CVV", expiry: "Expiry Date",
        network: "Network", brand: "Brand", network_type: "Network Type"
    };
    const placeHolder = {
        color: "grey", code: "1111222233334444", name: "xyz", cvv: "123", expiry: "MM/YY",
        network: "Visa/Rupay", brand: "HDFC/SBI", network_type: "Credit/Debit/MasteCard"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const updateCardData = async (content) => {
        let finalContent = content;
        try {
            setIsLoading(true);
            const response = await processCardData("update", content);
            finalContent = response;
            if (response.length === 0) {
                setErrorMessage("No data available.");
            }
        } catch (error) {
            finalContent = [];
            setErrorMessage(`Error updating card data: ${error.message}`);
        } finally {
            setCardsData(finalContent)
            setIsLoading(false);
            setKeyDuration(30);
            setIsAddCardDialogOpen(false);
        }
    };

    return (
        <Dialog
            open={isAddCardDialogOpen}
            PaperProps={{
                sx: {
                    borderRadius: '12px', // Rounded corners for a retro touch
                    boxShadow: `8px 8px 0px ${backgroundColor}`, // Warm burnt orange shadow
                    border: "6px solid black",
                    '& .MuiDialogTitle-root': {
                        fontWeight: '800', // Bold title text
                    },
                    '& .MuiDialogContent-root': {
                        padding: '16px', // Padding for dialog content
                    },
                    '& .MuiButton-root': {
                        fontWeight: '800', // Bold title text
                        color: 'black', // Button text color
                        borderColor: 'black', // Button border color
                        '&:hover': {
                            fontWeight: '800', // Bold title text
                            color: 'white', // Button text color
                            backgroundColor: 'black', // Darker olive green for hover
                        },
                    },
                },
            }}
        >
            <DialogTitle>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: "800" }}>
                    <span>{viewMode === "create" ? "Add Card" : "Edit Card"}</span>
                    <ColorPicker color={cardDetails.color} setColor={handleInputChange} />
                </span>
            </DialogTitle>
            <DialogContent>
                <CreditCardForm handleInputChange={handleInputChange} label={label} placeHolder={placeHolder} cardDetails={cardDetails} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsAddCardDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    let newData = {
                        code: encryptData(cardDetails.code, encryptionKey, CryptoJS),
                        name: encryptData(cardDetails.name, encryptionKey, CryptoJS),
                        cvv: encryptData(cardDetails.cvv, encryptionKey, CryptoJS),
                        expiry: encryptData(cardDetails.expiry, encryptionKey, CryptoJS),
                        brand: encryptData(cardDetails.brand, encryptionKey, CryptoJS),
                        network: encryptData(cardDetails.network, encryptionKey, CryptoJS),
                        network_type: encryptData(cardDetails.network_type, encryptionKey, CryptoJS),
                        color: cardDetails.color
                    }
                    let finalData;
                    if (viewMode === "create") {
                        finalData = [...cardsData, newData];
                    } else {
                        finalData = [...cardsData];
                        finalData[selectedCardIndex] = { ...finalData[selectedCardIndex], ...newData };
                    }
                    updateCardData(finalData);
                }}>{viewMode === "edit" ? "Save" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
};