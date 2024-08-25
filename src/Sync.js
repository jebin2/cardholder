import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { processCardData } from './common';

export default function Sync({ onSyncComplete, setIsLoading }) {
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        ux_mode: 'redirect',
        redirect_uri: window.location.href.endsWith("/") ? window.location.href.substring(0, window.location.href.length - 1) : window.location.href,
        scope: 'https://www.googleapis.com/auth/drive.appdata',  // Add required scopes
    });

    return (
        <div>
            <div onClick={() => {
                setIsLoading(true);
                if (localStorage.getItem("access_token")) {
                    processCardData("pushToServer")
                        .then((response) => {
                            setIsLoading(false);
                            onSyncComplete(true, "success", "Sync Competed");
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            onSyncComplete(true, "error", "Issue with Sync try again later.");
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
