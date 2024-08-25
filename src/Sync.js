import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { processCardData } from './common';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import './App.css';
import { IconButton } from '@mui/material';

export default function Sync({ from, onSyncComplete, setIsLoading }) {
    const clientId = window.location.host.includes("localhost")
        ? "386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com"
        : "386326794734-7vscbpqmdplr1grnt7ddva2c62597nut.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleComp
                from={from}
                onSyncComplete={onSyncComplete}
                setIsLoading={setIsLoading}
            />
        </GoogleOAuthProvider>
    );
}

function GoogleComp({ from, onSyncComplete, setIsLoading }) {
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        ux_mode: 'redirect',
        redirect_uri: window.location.href.endsWith("/")
            ? window.location.href.substring(0, window.location.href.length - 1)
            : window.location.href,
        scope: 'https://www.googleapis.com/auth/drive.appdata', // Add required scopes
    });

    const syncAll = () => {
        setIsLoading(true);
        if (localStorage.getItem("access_token")) {
            processCardData("pushToServer")
                .then((response) => {
                    setIsLoading(false);
                    onSyncComplete(true, "success", "Sync Completed");
                })
                .catch((error) => {
                    setIsLoading(false);
                    onSyncComplete(true, "error", "Issue with Sync, try again later.");
                });
        } else {
            googleLogin();
        }
    };

    return (
        from === "card" ? (
            <IconButton className='sync-icon' onClick={syncAll}>
                <CloudOffIcon />
            </IconButton>
        ) : (
            <div onClick={syncAll}>
                Sync with Google Drive
            </div>
        )
    );
}
