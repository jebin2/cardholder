import React, { useState, useMemo, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CreditCardForm from './CreditCardForm';
import ColorPicker from './ColorPicker';
import CryptoJS from 'crypto-js';
import { processCardData, encryptData, decryptData, buttonSx, dialogSx } from './common';

export default React.memo(function AddCardDialog({ isAddCardDialogOpen, setIsAddCardDialogOpen, viewMode, cardsData, setCardsData, selectedCardIndex, encryptionKey, setIsLoading, setErrorMessage, setKeyDuration }) {
    const initialCardDetails = useMemo(() => ({
        color: selectedCardIndex !== -1 ? cardsData[selectedCardIndex].color : "black",
        code: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].code, encryptionKey, CryptoJS) : "",
        name: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].name, encryptionKey, CryptoJS) : "",
        cvv: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].cvv, encryptionKey, CryptoJS) : "",
        expiry: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].expiry, encryptionKey, CryptoJS) : "",
        network: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].network, encryptionKey, CryptoJS) : "",
        brand: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].brand, encryptionKey, CryptoJS) : "",
        network_type: selectedCardIndex !== -1 ? decryptData(cardsData[selectedCardIndex].network_type, encryptionKey, CryptoJS) : ""
    }), [selectedCardIndex, cardsData, encryptionKey]);

    const [cardDetails, setCardDetails] = useState(initialCardDetails);
    const label = useMemo(() => ({
        color: "Color", code: "Number", name: "Name", cvv: "CVV", expiry: "Expiry Date",
        network: "Network", brand: "Brand", network_type: "Network Type"
    }), []);
    const placeHolder = useMemo(() => ({
        color: "grey", code: "1111222233334444", name: "xyz", cvv: "123", expiry: "MM/YY",
        network: "Visa/Rupay", brand: "HDFC/SBI", network_type: "Credit/Debit/MasteCard"
    }), []);

    const [errors, setErrors] = useState({
        code: "", name: "", cvv: "", expiry: ""
    })
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    }, []);

    const upsertCardData = useCallback(async (cardObj) => {
        let finalContent;
        try {
            setIsLoading(true);
            const response = await processCardData("upsert", cardObj);
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
    }, [setIsLoading, setErrorMessage, setCardsData, setKeyDuration, setIsAddCardDialogOpen]);

    const handleClose = useCallback(() => {
        setKeyDuration(30);
        setIsAddCardDialogOpen(false);
    }, [setKeyDuration, setIsAddCardDialogOpen]);

    const handleSave = useCallback(() => {
        let fieldError = {
            code: "", name: "", cvv: "", expiry: ""
        }
        if (cardDetails.code.length < 19) {
            fieldError = { ...fieldError, code: "Not valid" };
        } else {
            fieldError = { ...fieldError, code: "" };
        }
        if (cardDetails.expiry.length < 5) {
            fieldError = { ...fieldError, expiry: "Not valid" };
        } else {
            fieldError = { ...fieldError, expiry: "" };
        }
        if (cardDetails.cvv.length < 3) {
            fieldError = { ...fieldError, cvv: "Not valid" };
        } else {
            fieldError = { ...fieldError, cvv: "" };
        }
        if (cardDetails.name.length === 0) {
            fieldError = { ...fieldError, name: "Not valid" };
        } else {
            fieldError = { ...fieldError, name: "" };
        }
        setErrors(fieldError);
        if (Object.keys(fieldError).filter(key => fieldError[key] !== "")[0]) {
            return false;
        }
        let cardObj = {
            key: new Date().getTime(),
            code: encryptData(cardDetails.code, encryptionKey, CryptoJS),
            name: encryptData(cardDetails.name, encryptionKey, CryptoJS),
            cvv: encryptData(cardDetails.cvv, encryptionKey, CryptoJS),
            expiry: encryptData(cardDetails.expiry, encryptionKey, CryptoJS),
            brand: encryptData(cardDetails.brand, encryptionKey, CryptoJS),
            network: encryptData(cardDetails.network, encryptionKey, CryptoJS),
            network_type: encryptData(cardDetails.network_type, encryptionKey, CryptoJS),
            color: cardDetails.color,
            is_synced: false,
            is_deleted: false
        }
        cardObj.last_modified_time = cardObj.key;
        if (viewMode === "edit") {
            cardObj = { ...cardObj, key: cardsData[selectedCardIndex].key }
            cardObj.last_modified_time = new Date().getTime();
        }
        upsertCardData(cardObj);
    }, [cardDetails, encryptionKey, viewMode, cardsData, selectedCardIndex, upsertCardData]);

    let localDialogSX = dialogSx();
    delete localDialogSX.width;
    delete localDialogSX['& .MuiDialogTitle-root'].borderBottom;

    return (
        <Dialog
            open={isAddCardDialogOpen}
            PaperProps={{
                sx: localDialogSX,
            }}
        >
            <DialogTitle>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: "800" }}>
                    <span>{viewMode === "create" ? "Add Card" : "Edit Card"}</span>
                    <ColorPicker color={cardDetails.color} setColor={handleInputChange} />
                </span>
            </DialogTitle>
            <DialogContent>
                <CreditCardForm handleInputChange={handleInputChange} label={label} placeHolder={placeHolder} cardDetails={cardDetails} errors={errors} />
            </DialogContent>
            <DialogActions>
                <Button
                    sx={buttonSx}
                    onClick={handleClose}>Close</Button>
                <Button
                    sx={buttonSx}
                    onClick={handleSave}>{viewMode === "edit" ? "Save" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
});