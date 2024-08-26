import React, { useState, useCallback } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { processCardData, backgroundColor } from './common';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import './App.css';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box } from '@mui/material';
import ErrorRedirect from './ErrorRedirect';

export default function Sync({ from, onSyncComplete, setIsLoading }) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || (
        window.location.hostname === "localhost"
            ? "386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com"
            : "386326794734-7vscbpqmdplr1grnt7ddva2c62597nut.apps.googleusercontent.com"
    );
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSyncClick = useCallback(() => setShowConfirmDialog(true), []);

    const dialogProps = {
        PaperProps: {
            sx: {
                width: "340px",
                borderRadius: '12px',
                boxShadow: `8px 8px 0px ${backgroundColor}`,
                border: "6px solid black",
                '& .MuiDialogTitle-root': {
                    fontWeight: '800',
                    borderBottom: '2px solid black',
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
                        borderColor: 'black',
                    },
                },
            },
        },
        open: showConfirmDialog,
        onClose: () => setShowConfirmDialog(false),
        'aria-labelledby': "confirm-dialog-title",
        'aria-describedby': "confirm-dialog-description",
    };

    return (
        <>
            {showConfirmDialog && (
                <Dialog {...dialogProps}>
                    <DialogTitle id="confirm-dialog-title">
                        <Box display="flex" alignItems="center">
                            <Typography variant="h6" component="span">Confirm Sync</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText variant="body2" sx={{ fontWeight: "600", marginTop: 2 }}>
                            You will be redirect to Google sign in page to perform Google Drive Sync?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowConfirmDialog(false)} variant="outlined">Cancel</Button>
                        <GoogleOAuthProvider clientId={clientId} onScriptLoadError={() => setShowError(true)}>
                            <GoogleSyncButton
                                from={from}
                                onSyncComplete={onSyncComplete}
                                setIsLoading={setIsLoading}
                                onSuccess={() => setShowConfirmDialog(false)}
                            />
                        </GoogleOAuthProvider>
                    </DialogActions>
                </Dialog>
            )}
            {showError && <ErrorRedirect from="nointernet" message="Please ensure you have a stable internet connection for this action." />}
            {from === "card" ? (
                <IconButton className='sync-icon' onClick={handleSyncClick}>
                    <CloudSyncIcon />
                </IconButton>
            ) : (
                <div onClick={handleSyncClick}>
                    Sync with Google Drive
                </div>
            )}
        </>
    );
}

function GoogleSyncButton({ onSyncComplete, setIsLoading, onSuccess }) {
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        ux_mode: 'redirect',
        scope: 'https://www.googleapis.com/auth/drive.appdata',
        onSuccess: () => {
            setIsLoading(true);
            processCardData("pushToServer", undefined, true)
                .then(() => {
                    setIsLoading(false);
                    onSyncComplete(true, "success", "Sync Completed");
                    onSuccess();
                })
                .catch((error) => {
                    setIsLoading(false);
                    onSyncComplete(true, "error", "Issue with Sync, please try again later.");
                });
        },
        onError: (error) => {
            onSyncComplete(true, "error", "Failed to authenticate with Google. Please try again.");
        },
    });

    return (
        <Button
            onClick={googleLogin}
            variant="outlined"
            sx={{
                minWidth: '100px',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                }
            }}
        >
            Sync
        </Button>
    );
}