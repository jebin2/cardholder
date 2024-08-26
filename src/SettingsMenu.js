import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import './App.css';
import Sync from "./Sync";
import { processCardData, backgroundColor } from './common';
import InfoDialog from './InfoDialog';
import ErrorRedirect from './ErrorRedirect';

export default function SettingsMenu({ invokeAlert, setIsLoading, setCardsData }) {
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
    const [showError, setShowError] = useState(false);
    const [errorType, setErrorType] = useState("reset");
    const [errorMessage, setErrorMessage] = useState("Resetting the app will delete all the app related data from local.");
    const deleteFromGoogleDrive = async () => {
        try {
            setIsLoading(true);
            await processCardData("deleteFromServer", undefined, true);
            setShowDeleteOption(false);
            invokeAlert(true, "success", "Delete From Google Drive");
        } catch (error) {
            setErrorType("error");
            setErrorMessage("Please ensure you have a stable internet connection for this action.");
            setShowError(true);
        } finally {
            setAnchorEl(null);
            setIsLoading(false);
        }
    }
    const syncWithGoogleDrive = async () => {
        try {
            setIsLoading(true);
            let data = await processCardData("pushToServer", undefined, true);
            setCardsData(data);
            invokeAlert(true, "success", "Sync Competed");
        } catch (error) {
            setErrorType("error");
            setErrorMessage("Please ensure you have a stable internet connection for this action.");
            setShowError(true);
        } finally {
            setAnchorEl(null);
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
                {showDeleteOption && <MenuItem onClick={syncWithGoogleDrive}>
                    Sync with Google Drive
                </MenuItem>}
                {showDeleteOption && <MenuItem onClick={deleteFromGoogleDrive}>
                    Delete From Google Drive
                </MenuItem>}
                {!showDeleteOption &&
                    <MenuItem>
                        <Sync setIsLoading={setIsLoading} onSyncComplete={invokeAlert} />
                    </MenuItem>
                }
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    window.location.href = "/cardholder";
                }}>
                    Refresh App
                </MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    setErrorType("reset");
                    setErrorMessage("Resetting the app will delete all the app related data from local.");
                    setShowError(true);
                }}>
                    Reset App
                </MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    setInfoOpen(true);
                }}>
                    App Info
                </MenuItem>
            </Menu>

            <InfoDialog open={infoOpen} setOpen={setInfoOpen} />
            {showError && <ErrorRedirect type={errorType} message={errorMessage} />}
        </div>
    );
}