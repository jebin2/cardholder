import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, Slider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, LockClock, Key as KeyIcon } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import { decryptData, buttonSx, dialogSx } from './common';

const KeyPopupDialog = ({ isKeyDialogOpen, setIsKeyDialogOpen, viewMode, selectedCardIndex, cardData, callback, setKeyDuration, setEncryptionKey }) => {
    const [key, setKey] = useState("");
    const [keyTTL, setKeyTTL] = useState(30);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const marks = useMemo(() => {
        return Array.from({ length: 6 }, (_, i) => ({
            value: (i + 1) * 10,
            label: `${(i + 1) * 10}s`,
        }));
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        if (key.length < 10) {
            setError(true);
            setErrorMsg('Minimum 10 characters required');
            return;
        }
        if (cardData && cardData.code && decryptData(cardData.code, key, CryptoJS).length !== 19) {
            setError(true);
            setErrorMsg('Invalid Key');
            return;
        }
        setError(false);
        setErrorMsg("");
        if (viewMode === "show") {
            setKeyDuration(keyTTL);
        }
        setEncryptionKey(key);
        callback(viewMode, selectedCardIndex);
        setIsKeyDialogOpen(false);
    };

    let localDialogSX = dialogSx();
    delete localDialogSX['& .MuiDialogTitle-root'].borderBottom;

    return (
        <Dialog
            open={isKeyDialogOpen}
            onClose={() => setIsKeyDialogOpen(false)}
            PaperProps={{
                sx: localDialogSX,
            }}
            aria-labelledby="key-dialog-title"
        >
            <DialogTitle id="key-dialog-title">
                <Box display="flex" alignItems="center">
                    <KeyIcon style={{ marginRight: '8px' }} />
                    <Typography variant="h6" component="span">Enter Encryption Key</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="cardKey"
                    name="cardKey"
                    label="Encryption Key"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="standard"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    error={error}
                    helperText={errorMsg}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'black',
                            fontSize: '0.9rem',
                            '&::before': {
                                borderBottom: "2px solid black"
                            },
                            '&::after': {
                                borderBottom: "2px solid black"
                            },
                            '&:hover:not(.Mui-disabled)::before': {
                                borderBottom: "2px solid black"
                            },
                        },
                        '& .MuiInputAdornment-root': {
                            color: 'black',
                        },
                        '& .MuiIconButton-root': {
                            color: 'black',
                        },
                        '& .MuiFormLabel-root': {
                            color: 'black',
                            '&.Mui-focused': {
                                color: 'black'
                            },
                        },
                        '& .Mui-error': {
                            color: 'red',
                            '&::after': {
                                borderBottomColor: 'red'
                            }
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'red',
                        }
                    }}
                />
                {viewMode === "show" && (
                    <Box sx={{ width: 300, marginTop: 2 }}>
                        <Typography variant="body2" gutterBottom>
                            <LockClock fontSize="small" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            Time to Destroy
                        </Typography>
                        <Slider
                            name="timeToDestroy"
                            defaultValue={30}
                            step={6}
                            min={10}
                            marks={marks}
                            valueLabelDisplay="auto"
                            value={keyTTL}
                            onChange={(event, newValue) => setKeyTTL(newValue)}
                        />
                    </Box>
                )}
                <Typography variant="caption" sx={{
                    display: 'block', mt: 2, color: 'text.secondary', fontWeight: "800", textAlign: "center"
                }}>
                    Keep this key secure. It's essential for encrypting/decrypting the data.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setIsKeyDialogOpen(false)}
                    color="primary"
                    sx={buttonSx}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleSubmit}
                    sx={buttonSx}
                >
                    {viewMode === "create" ? "Add" : viewMode === "edit" ? "Edit" : viewMode === "delete" ? "Delete" : "Show"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default KeyPopupDialog;