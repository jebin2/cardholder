import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    AppBar, Box, Toolbar, Typography, IconButton, Chip, Input, InputAdornment, Tooltip
} from '@mui/material';
import {
    FlipCameraAndroid as FlipCameraIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, AddCard as AddCardIcon, Edit as EditIcon, Search
} from '@mui/icons-material';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { processCardData, decryptData, truncateIndexedDB } from './common';
import CryptoJS from 'crypto-js';
import Loading from './Loading';
import StateAlert from './StateAlert';
import SettingsMenu from './SettingsMenu';
import KeyPopupDialog from './KeyPopupDialog';
import AddCardDialog from './AddCardDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudOffIcon from '@mui/icons-material/CloudOff';

const backgroundColor = "#564bf5";
const netlifyUrl = window.location.host.includes("localhost") ? "http://localhost:8888" : "https://jeapis.netlify.app";

function App() {
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
    const [searchQuery, setSearchQuery] = useState('');
    const [alertState, setAlertState] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("none");

    const saveToken = async (code) => {
        try {
            const content = await processCardData("fetch");
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
            if (data.content) {
                await truncateIndexedDB();
                await processCardData("upsert", data.content);
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        } finally {
            setIsLoading(false);
            window.location.href = "/cardholder";
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
            setCardsData(finalContent);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            saveToken(code);
        } else {
            fetchCardData();
        }
    }, []);

    const toggleCardFlip = useCallback((index) => {
        setFlippedCardIndices(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }, []);

    const toggleCardVisibility = useCallback((index) => {
        setVisibleCardIndices(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }, []);

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

    const handleCardAction = useCallback((type, index, localData) => {
        setViewMode(type);
        setSelectedCardIndex(index);
        if (encryptionKey) {
            keySuccessCallback(type, index, localData);
        } else {
            setIsKeyDialogOpen(true);
        }
    }, [encryptionKey]);

    const invokeAlert = useCallback((state, type, message) => {
        setAlertState(state);
        setAlertType(type);
        setAlertMessage(message);
    }, []);

    const deleteCard = async (index, localData) => {
        let finalContent;
        try {
            setIsLoading(true);
            let delData = localData[index];
            delData.is_deleted = true;
            const response = await processCardData("delete", delData);
            finalContent = response;
            if (response.length === 0) {
                setErrorMessage("No data available.");
            }
        } catch (error) {
            finalContent = [];
            setErrorMessage(`Error fetching card data: ${error.message}`);
        } finally {
            setCardsData(finalContent);
            setKeyDuration(30);
            setIsLoading(false);
        }
    }

    const keySuccessCallback = useCallback((type, index, localData) => {
        switch (type) {
            case "show":
                toggleCardVisibility(index);
                break;
            case "create":
            case "edit":
                setKeyDuration(0);
                setVisibleCardIndices([]);
                setIsAddCardDialogOpen(true);
                break;
            case "delete":
                setKeyDuration(0);
                setVisibleCardIndices([]);
                deleteCard(index, localData);
                break;
            case "showAll":
                setKeyDuration(0);
                setVisibleCardIndices(Object.keys(cardsData).map(x => parseInt(x)));
                break;
            case "hideAll":
                setKeyDuration(0);
                setEncryptionKey("");
                setVisibleCardIndices([]);
                break;
            default:
                setIsAddCardDialogOpen(true);
        }
    }, [cardsData, toggleCardVisibility, deleteCard]);

    const filteredCardsData = useMemo(() => {
        return cardsData.filter(card => {
            if (!encryptionKey) return true;
            return Object.keys(card).some(key =>
                !["color", "key"].includes(key) && decryptData(card[key], encryptionKey, CryptoJS).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [cardsData, encryptionKey, searchQuery]);
    
    const CardIcons = useCallback(({ visibleCardIndices, index, toggleCardFlip, handleCardAction }) => (
        <>
            <IconButton className="delete-icon" onClick={() => handleCardAction("delete", index, cardsData)}>
                <DeleteIcon />
            </IconButton>
            <IconButton className="edit-icon" onClick={() => handleCardAction("edit", index)}>
                <EditIcon />
            </IconButton>
            <IconButton className='ai-icon' onClick={() => handleCardAction("show", index)}>
                {visibleCardIndices.includes(index) ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton className='flip-icon' onClick={() => toggleCardFlip(index)}>
                <FlipCameraIcon fontSize="large" />
            </IconButton>
            {!cardsData[index].is_synced && <IconButton className='sync-icon' onClick={() => syncAll()}>
                <CloudOffIcon />
            </IconButton> }
        </>
    ), [cardsData]);

    const syncAll = () => {
        setIsLoading(true);
        processCardData("pushToServer")
            .then((response) => {
                setCardsData(response)
                setIsLoading(false);
                invokeAlert(true, "success", "Sync Competed");
            })
            .catch(() => {
                setIsLoading(false);
                invokeAlert(true, "error", "Issue with Sync try again later.");
            });
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: backgroundColor, borderBottom: "6px solid black" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>My Cards</Typography>
                        {keyDuration > 0 && encryptionKey && <KeyTimer duration={keyDuration} />}
                        {cardsData.length !== 0 ? encryptionKey && keyDuration === 0 ?
                            <IconButton
                                sx={{
                                    color: "white", marginLeft: "1rem", '&:hover': {
                                        backgroundColor: "black"
                                    }
                                }}
                                onClick={() => handleCardAction("hideAll")}
                            >
                                <VisibilityIcon />
                            </IconButton> :
                            <IconButton
                                sx={{
                                    color: "white",
                                    marginLeft: "1rem",
                                    '&:hover': {
                                        backgroundColor: "black"
                                    }
                                }}
                                onClick={() => handleCardAction("showAll")}
                            >
                                <VisibilityOffIcon />
                            </IconButton>
                            : <></>
                        }
                        <IconButton sx={{
                            color: "white", marginLeft: "1rem", '&:hover': {
                                backgroundColor: "black"
                            }
                        }} onClick={() => openAddCardDialog(true)}><AddCardIcon /></IconButton>
                        <SettingsMenu invokeAlert={invokeAlert} setIsLoading={setIsLoading} setCardsData={setCardsData} setErrorMessage={setErrorMessage} />
                    </Toolbar>
                </AppBar>
            </Box>
            {cardsData.length !== 0 && <div className="search-bar">
                <Input
                    placeholder="Search by Name, Brand, network or network type"
                    startAdornment={
                        <>
                            <InputAdornment position="start" sx={{
                                marginLeft: "10px"
                            }}>
                                <Search />
                            </InputAdornment>
                        </>
                    }
                    value={searchQuery}
                    onChange={(e) => {
                        if (!encryptionKey) {
                            invokeAlert(true, "warning", "Click on the eye icon to decrypt and perform search");
                        }
                        setSearchQuery(e.target.value)
                    }
                    }
                    className="search-input"
                    disableUnderline
                    sx={{
                        fontWeight: "800",
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        width: '80%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        border: "6px solid black",
                        transition: 'box-shadow 0.3s ease',
                        '& .MuiInputAdornment-root': {
                            color: 'black'
                        },
                        '&:hover, &:focus, &:focus-within, &:active': {
                            boxShadow: `12px 12px 0px #564bf5`,
                        },
                        '& .MuiInputAdornment-root': {
                            color: 'black',
                        },
                    }}
                />
            </div>}
            <div className="content" style={cardsData.length === 0 ? { paddingTop: "5rem" } : {}}>
                {cardsData.length === 0 ? <Typography variant="h6" sx={{ flexGrow: 1, justifyContent: "center", display: "flex", marginTop: "5%" }}>
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
                        {filteredCardsData.map((card, index) => (
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

            {isKeyDialogOpen && <KeyPopupDialog isKeyDialogOpen={isKeyDialogOpen} setIsKeyDialogOpen={setIsKeyDialogOpen} backgroundColor={backgroundColor} selectedCardIndex={selectedCardIndex} viewMode={viewMode} setEncryptionKey={setEncryptionKey} setKeyDuration={setKeyDuration} cardData={cardsData[0]} callback={keySuccessCallback} />}

            {isAddCardDialogOpen && <AddCardDialog backgroundColor={backgroundColor} isAddCardDialogOpen={isAddCardDialogOpen} setIsAddCardDialogOpen={setIsAddCardDialogOpen} viewMode={viewMode} cardsData={cardsData} setCardsData={setCardsData} setIsLoading={setIsLoading} selectedCardIndex={selectedCardIndex} setErrorMessage={setErrorMessage} encryptionKey={encryptionKey} setKeyDuration={setKeyDuration} />}

            <StateAlert state={alertState} type={alertType} message={alertMessage} setAlertState={setAlertState} />

            <AppBar position="fixed" sx={{
                backgroundColor: "#333",
                color: "white",
                textAlign: "center",
                padding: "10px",
                top: 'auto',
                bottom: "0"
            }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>All card details are stored in an encrypted format.</Typography>
                </Toolbar>
            </AppBar>
            <Loading show={isLoading} />
        </>
    );
}

export default App;