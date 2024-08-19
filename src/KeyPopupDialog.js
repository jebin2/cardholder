import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, Slider } from '@mui/material';
import CryptoJS from 'crypto-js';
import { decryptData } from './common';

const KeyPopupDialog = ({ isKeyDialogOpen, setIsKeyDialogOpen, backgroundColor, viewMode, cardData, callback, setKeyDuration, setEncryptionKey }) => {

    const [key, setKey] = useState("");
    const [keyTTL, setKeyTTL] = useState(30);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const marks = React.useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            value: (i + 1) * 10,
            label: `${(i + 1) * 10}s`,
        }));
    }, []);

    return (
        <Dialog
            open={isKeyDialogOpen}
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: `8px 8px 0px ${backgroundColor}`,
                    border: "6px solid black",
                    '& .MuiDialogTitle-root': {
                        fontWeight: '800',
                    },
                    '& .MuiDialogContent-root': {
                        padding: '16px',
                    },
                    '& .MuiButton-root': {
                        fontWeight: '800',
                        color: 'black',
                        borderColor: 'black',
                        '&:hover': {
                            fontWeight: '800',
                            color: 'white',
                            backgroundColor: 'black',
                        },
                    },
                },
            }}
        >
            <DialogTitle>Key</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="cardKey"
                    name="cardKey"
                    label="Key"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={key}
                    onChange={(e) => {
                        setKey(e.target.value)
                    }}
                    error={error}
                    helperText={errorMsg}
                />
                {viewMode === "show" && (
                    <Box sx={{ width: 300, marginTop: 2 }}>
                        <Typography variant="body2" gutterBottom>Time to Destroy</Typography>
                        <Slider
                            name="timeToDestroy"
                            defaultValue={30}
                            step={10}
                            min={10}
                            marks={marks}
                            valueLabelDisplay="auto"
                            value={keyTTL}
                            onChange={(event, newValue) => setKeyTTL(newValue)}
                        />
                    </Box>
                )}
                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary', fontWeight: "800", width: 300}}>
                    Keep this key secure--it's essential for encrypting/decrypting the data.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setError(false);
                    setIsKeyDialogOpen(false);
                }}>
                    Close
                </Button>
                <Button onClick={() => {
                    if (key.length < 10) {
                        setError(true);
                        setErrorMsg('Minimum 10 characters required')
                        return;
                    }
                    if (viewMode !== "create" && decryptData(cardData.code, key, CryptoJS).length !== 19) {
                        setError(true);
                        setErrorMsg('Invalid Key')
                        return;
                    }
                    setError(false);
                    setErrorMsg("");
                    if(viewMode === "show") {
                        setKeyDuration(keyTTL);
                    }
                    setEncryptionKey(key)
                    callback();
                    setIsKeyDialogOpen(false);
                }}>
                    {viewMode === "create" ? "Add" : viewMode === "edit" ? "Edit" : "Show"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default KeyPopupDialog;