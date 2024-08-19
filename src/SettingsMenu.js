import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import './App.css';
import Sync from "./Sync";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { processCardData } from './common';

export default function SettingsMenu({ invokeAlert, setIsLoading, setCardsData, setErrorMessage }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [showDeleteOption, setShowDeleteOption] = useState(localStorage.getItem("googleDriveSyncEnabled") === "true");
    const deleteDataFromGoogleDrive = async () => {
        try {
            setIsLoading(true);
            await processCardData("delete");
            setShowDeleteOption(false);
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
            >
                {showDeleteOption ?
                    <MenuItem onClick={deleteDataFromGoogleDrive}>
                        Delete Data From Google Drive
                    </MenuItem> : <MenuItem onClick={handleClose}>
                        <GoogleOAuthProvider clientId='386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com'>
                            <Sync setIsLoading={setIsLoading} onSyncComplete={invokeAlert} />
                        </GoogleOAuthProvider>
                    </MenuItem>}
            </Menu>
        </div>
    );
}