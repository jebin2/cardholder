import React, { useState, useCallback, useEffect } from 'react';
import {
    AppBar, Box, Toolbar, Typography, IconButton, Chip
} from '@mui/material';
import {
    FlipCameraAndroid as FlipCameraIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, AddCard as AddCardIcon, Edit as EditIcon
} from '@mui/icons-material';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { processCardData, decryptData } from './common';
import CryptoJS from 'crypto-js';
import Loading from './Loading';
import StateAlert from './StateAlert';
import SettingsMenu from './SettingsMenu';
import KeyPopupDialog from './KeyPopupDialog';
import AddCardDialog from './AddCardDialog';

function App() {
    const backgroundColor = "#564bf5";
    const netlifyUrl = window.location.host === "localhost" ? "http://localhost:8888" : "https://jeapis.netlify.app/";
    const [cardsData, setCardsData] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
    const [visibleCardIndices, setVisibleCardIndices] = useState([]);
    const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
    const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
    const [flippedCardIndices, setFlippedCardIndices] = useState([]);
    const [viewMode, setViewMode] = useState("");
    const [encryptionKey, setEncryptionKey] = useState("");
    const [keyDuration, setKeyDuration] = useState(0);
    const [commonError, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [alertState, setAlertState] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("none");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            saveToken(code);
        } else {
            fetchCardData();
        }
    }, []);

    const saveToken = async (code) => {
        try {
            let content = localStorage.getItem("card_data");
            if(content) {
                content = JSON.parse(content);
            } else {
                content = [];
            }
            setIsLoading(true);
            const response = await fetch(netlifyUrl + '/.netlify/functions/googleAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code, content: content })
            });
            const data = await response.json();
            localStorage.setItem("access_token", data.response.access_token);
            localStorage.setItem("refresh_token", data.response.refresh_token);
            localStorage.setItem("card_data", data.response.content);
            localStorage.setItem("googleDriveSyncEnabled", "true");
        } catch (error) {
            console.error('Error fetching tokens:', error);
        } finally {
            setIsLoading(false);
            window.location.href = "/";
        }
    };

    const fetchCardData = async () => {
        let finalContent = [];
        try {
            setIsLoading(true);
            const response = await processCardData("fetch");
            finalContent = response;
            if (response.length === 0) {
                setErrorMessage("No data available.");
            }
        } catch (error) {
            finalContent = [];
            setErrorMessage(`Error fetching card data: ${error.message}`);
        } finally {
            setCardsData(finalContent)
            setIsLoading(false);
        }
    };

    const toggleCardFlip = (index) => setFlippedCardIndices(flippedCardIndices.includes(index) ? flippedCardIndices.filter(i => i !== index) : [...flippedCardIndices, index]);

    const toggleCardVisibility = (index) => {
        setVisibleCardIndices(visibleCardIndices.includes(index) ? visibleCardIndices.filter(i => i !== index) : [...visibleCardIndices, index]);
    };

    const KeyTimer = useCallback(({ duration }) => (
        <CountdownCircleTimer
            strokeWidth={4}
            size={40}
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
                setKeyDuration(0);
                setEncryptionKey("");
                setVisibleCardIndices([]);
            }}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    ), []);

    const openAddCardDialog = () => {
        setViewMode("create");
        handleCardAction("create", -1);
    };

    const handleCardAction = (type, index) => {
        setViewMode(type);
        setSelectedCardIndex(index);
        switch (type) {
            case "show":
                if (encryptionKey) {
                    toggleCardVisibility(index);
                } else {
                    setIsKeyDialogOpen(true);
                }
                break;
            default:
                if (encryptionKey) {
                    setKeyDuration(0);
                    setVisibleCardIndices([]);
                    setIsAddCardDialogOpen(true);
                } else {
                    setIsKeyDialogOpen(true);
                }
        }
    };

    const invokeAlert = (state, type, message) => {
        setAlertState(state);
        setAlertType(type);
        setAlertMessage(message);
    };

    const keySuccessCallback = () => {
        switch (viewMode) {
            case "show":
                toggleCardVisibility(selectedCardIndex);
                break;
            case "create":
            case "edit":
                setIsAddCardDialogOpen(true);
                break;
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: backgroundColor, borderBottom: "6px solid black" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>My Cards</Typography>
                        {keyDuration > 0 && encryptionKey && <KeyTimer duration={keyDuration} />}
                        <IconButton sx={{
                            color: "white", marginLeft: "1rem", '&:hover': {
                                backgroundColor: "black"
                            }
                        }} onClick={() => openAddCardDialog(true)}><AddCardIcon /></IconButton>
                        <SettingsMenu invokeAlert={invokeAlert} setIsLoading={setIsLoading} setCardsData={setCardsData} setErrorMessage={setErrorMessage} />
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="content">
                {cardsData.length === 0 ? <Typography variant="h6" sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
                    {commonError === "No data available." ?
                        <Chip label="Add Card" variant="outlined" onClick={() => openAddCardDialog(true)} icon={<AddCardIcon fontSize='large' />} size='medium' sx={{
                            padding: "16px 12px",
                            fontSize: "1.5rem",
                            border: "4px solid black",  // Burnt orange border for a retro feel
                            // backgroundColor: "#4A5D23",  // Muted olive green background color
                            color: "black",  // Burnt orange text color to match the border
                            borderRadius: "8px",  // Rounded corners
                            boxShadow: `4px 4px 0px ${backgroundColor}`,  // Warm brown shadow for depth
                            transition: "box-shadow 0.3s ease, transform 0.3s ease",  // Smooth transition for hover effects
                            '&:hover': {
                                boxShadow: `8px 8px 0px ${backgroundColor}`,  // Stronger burnt orange shadow on hover
                                transform: "translate(-4px, -4px)",  // Move the chip slightly up and left on hover
                                backgroundColor: "#3C4B1E",  // Slightly darker olive green on hover
                                cursor: "pointer",  // Pointer cursor on hover
                            },
                        }} /> :
                        commonError
                    }
                </Typography> :
                    <div className="cards-grid">
                        {cardsData.map((card, index) => (
                            <div key={index} className="card-container">
                                <div className={`card ${flippedCardIndices.includes(index) ? 'flipped' : ''}`}>
                                    <div className="card-front" style={{ backgroundColor: card.color }}>
                                        <div className="card-brand">{visibleCardIndices.includes(index) ? decryptData(card.brand, encryptionKey, CryptoJS) : "*****"}</div>
                                        <div className="card-number">{visibleCardIndices.includes(index) ? decryptData(card.code, encryptionKey, CryptoJS).replace(/(\d{4})(?=\d)/g, '$1 ').trim() : "**** **** **** ****"}</div>
                                        <div className="card-info">
                                            <div className="card-name">{visibleCardIndices.includes(index) ? decryptData(card.name, encryptionKey, CryptoJS) : "***** ********"}</div>
                                            <div className="card-expiry">{visibleCardIndices.includes(index) ? decryptData(card.expiry, encryptionKey, CryptoJS) : "**/**"}</div>
                                        </div>
                                        <CardIcons
                                            visibleCardIndices={visibleCardIndices}
                                            index={index}
                                            toggleCardFlip={toggleCardFlip}
                                            handleCardAction={handleCardAction}
                                        />
                                        <div className="card-type">{visibleCardIndices.includes(index) ? decryptData(card.network, encryptionKey, CryptoJS) : "**********"}</div>
                                        <div className="card-label">{visibleCardIndices.includes(index) ? decryptData(card.network_type, encryptionKey, CryptoJS) : "******"}</div>
                                    </div>
                                    <div className="card-back">
                                        <div className="card-barcode"></div>
                                        <CardIcons
                                            visibleCardIndices={visibleCardIndices}
                                            index={index}
                                            toggleCardFlip={toggleCardFlip}
                                            handleCardAction={handleCardAction}
                                        />
                                        <div className="card-cvv">{visibleCardIndices.includes(index) ? `CVV: ${decryptData(card.cvv, encryptionKey, CryptoJS)}` : "CVV: ***"}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

            {isKeyDialogOpen && <KeyPopupDialog isKeyDialogOpen={isKeyDialogOpen} setIsKeyDialogOpen={setIsKeyDialogOpen} backgroundColor={backgroundColor} viewMode={viewMode} setEncryptionKey={setEncryptionKey} setKeyDuration={setKeyDuration} cardData={cardsData[0]} callback={keySuccessCallback} />}

            {isAddCardDialogOpen && <AddCardDialog backgroundColor={backgroundColor} isAddCardDialogOpen={isAddCardDialogOpen} setIsAddCardDialogOpen={setIsAddCardDialogOpen} viewMode={viewMode} cardsData={cardsData} setCardsData={setCardsData} setIsLoading={setIsLoading} selectedCardIndex={selectedCardIndex} setErrorMessage={setErrorMessage} encryptionKey={encryptionKey} setKeyDuration={setKeyDuration} />}

            <StateAlert state={alertState} type={alertType} message={alertMessage} setAlertState={setAlertState} />
            <footer className="footer">
                <p>All card details are stored in an encrypted format.</p>
            </footer>
            <Loading show={isLoading} />
        </>
    );
}

function CardIcons({ visibleCardIndices, index, toggleCardFlip, handleCardAction }) {
    return (
        <>
            <IconButton className="edit-icon" onClick={() => {
                handleCardAction("edit", index);
            }}>
                <EditIcon />
            </IconButton>
            <IconButton className='ai-icon' onClick={() => {
                handleCardAction("show", index);
            }}>
                {visibleCardIndices.includes(index) ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton className='flip-icon' onClick={() => toggleCardFlip(index)}>
                <FlipCameraIcon fontSize="large" />
            </IconButton>
        </>
    )
}

export default App;