import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import './App.css';
import Sync from "./Sync";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { processCardData } from './common';

export default function SettingsMenu({ invokeAlert, setShowLoading, setCardsData, setCommonError }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [showDeleteOption, setShowDeleteOption] = useState(!!localStorage.getItem("access_token"));
    const deleteDataFromGoogleDrive = async () => {
        try {
            setShowLoading(true);
            const response = await processCardData("delete");
            setCardsData(response);
            if (response.length === 0) {
                setShowDeleteOption(false);
                setCommonError("No data available.");
            }
        } catch (error) {
            setCardsData([]);
            setCommonError(`Error fetching card data: ${error.message}`);
        } finally {
            setShowLoading(false);
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
                <MenuItem onClick={handleClose}>
                    <GoogleOAuthProvider clientId='386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com'>
                        <Sync setShowLoading={setShowLoading} onSyncComplete={invokeAlert} />
                    </GoogleOAuthProvider>
                </MenuItem>
                {showDeleteOption ?
                    <MenuItem onClick={deleteDataFromGoogleDrive}>
                        Delete Data From Google Drive
                    </MenuItem> : <></>}
            </Menu>
        </div>
    );
}