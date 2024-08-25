import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import './App.css';
import Sync from "./Sync";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { processCardData } from './common';
import InfoDialog from './InfoDialog';
import ErrorRedirect from './ErrorRedirect';

export default function SettingsMenu({ backgroundColor, invokeAlert, setIsLoading, setCardsData, setErrorMessage }) {
    const clientId = window.location.host.includes("localhost") ? "386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com" : "386326794734-7vscbpqmdplr1grnt7ddva2c62597nut.apps.googleusercontent.com";
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [showDeleteOption, setShowDeleteOption] = useState(!!localStorage.getItem("access_token"));
    const [infoOpen, setInfoOpen] = useState(false);
    const [showResetPopUp, setShowResetPopUp] = useState();
    const deleteFromGoogleDrive = async () => {
        try {
            setIsLoading(true);
            await processCardData("deleteFromServer");
            setShowDeleteOption(false);
            invokeAlert(true, "success", "Delete From Google Drive");
        } catch (error) {
            setErrorMessage(`Error fetching card data: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }
    const syncWithGoogleDrive = async () => {
        try {
            setIsLoading(true);
            await processCardData("pushToServer");
            invokeAlert(true, "success", "Sync Competed");
        } catch (error) {
            setErrorMessage(`Error fetching card data: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <IconButton id="basic-button" sx={{
                color: "white", marginLeft: "1rem", '&:hover': {
                    backgroundColor: "black"
                }
            }}
                onClick={handleClick} ><SettingsIcon /></IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    '& .MuiPaper-root': {

                        borderRadius: '12px',
                        boxShadow: `8px 8px 0px ${backgroundColor}`,
                        border: "6px solid black",
                    },
                }}
            >
                {showDeleteOption ?
                    <>
                        <MenuItem onClick={syncWithGoogleDrive}>
                            Sync with Google Drive
                        </MenuItem>
                        <MenuItem onClick={deleteFromGoogleDrive}>
                            Delete From Google Drive
                        </MenuItem></> : <MenuItem onClick={handleClose}>
                        <GoogleOAuthProvider clientId={clientId}>
                            <Sync setIsLoading={setIsLoading} onSyncComplete={invokeAlert} />
                        </GoogleOAuthProvider>
                    </MenuItem>}
                <MenuItem onClick={() => {
                    setInfoOpen(true);
                }}>
                    App Info
                </MenuItem>
                <MenuItem onClick={() => {
                    setShowResetPopUp(true);
                }}>
                    Reset App
                </MenuItem>
            </Menu>
            <InfoDialog backgroundColor={backgroundColor} open={infoOpen} setOpen={setInfoOpen} />
            {showResetPopUp && <ErrorRedirect type="reset" message="Resetting the app will delete all the app related data from local." backgroundColor={backgroundColor} /> }
        </div>
    );
}