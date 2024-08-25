import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import './App.css';
import Sync from "./Sync";
import { processCardData } from './common';
import InfoDialog from './InfoDialog';
import ErrorRedirect from './ErrorRedirect';

export default function SettingsMenu({ backgroundColor, invokeAlert, setIsLoading, setCardsData, setErrorMessage }) {
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
            setAnchorEl(null);
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
            setAnchorEl(null);
            setIsLoading(true);
            let data = await processCardData("pushToServer");
            setCardsData(data);
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
                {showDeleteOption && <MenuItem onClick={syncWithGoogleDrive}>
                    Sync with Google Drive
                </MenuItem>}
                {showDeleteOption && <MenuItem onClick={deleteFromGoogleDrive}>
                    Delete From Google Drive
                </MenuItem>}
                {!showDeleteOption &&
                    <MenuItem onClick={handleClose}>
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
                    setShowResetPopUp(true);
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

            <InfoDialog backgroundColor={backgroundColor} open={infoOpen} setOpen={setInfoOpen} />
            {showResetPopUp && <ErrorRedirect type="reset" message="Resetting the app will delete all the app related data from local." backgroundColor={backgroundColor} />}
        </div>
    );
}