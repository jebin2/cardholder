import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { processCardData } from './common';

export default function Sync({ onSyncComplete, setShowLoading }) {
    // Set up Google login with redirect mode
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        ux_mode: 'redirect',  // Use redirect mode
        redirect_uri: 'http://localhost:3000/cardholder',  // Your redirect URIredirect_uri: 'http://localhost:3000/cardholder',  // Your redirect URI
        scope: 'https://www.googleapis.com/auth/drive.appdata',  // Add required scopes
    });

    return (
        <div>
            <div onClick={() => {
                setShowLoading(true);
                if (localStorage.getItem("access_token")) {
                    processCardData("fetch")
                        .then((response) => {
                            let localData = JSON.parse(localStorage.getItem("card_data"));
                            if (response.length !== localData.length) {
                                processCardData("update", localData)
                                    .then((response) => {
                                        setShowLoading(false);
                                        onSyncComplete(true, "success", "Sync Competed");
                                    })
                                    .catch((error) => {
                                        setShowLoading(false);
                                        onSyncComplete(true, "error", "Issue with Sync try again later.");
                                    });
                            } else {
                                setShowLoading(false);
                                onSyncComplete(true, "success", "Sync Competed");
                            }
                        })
                        .catch(() => {
                            googleLogin();
                        });
                } else {
                    googleLogin();
                }

            }}>
                Sync with Google
            </div>
        </div>
    );
}
