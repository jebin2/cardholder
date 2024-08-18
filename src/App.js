import React, { useState, useCallback, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import {
    AppBar, Box, Slider, Toolbar, Typography, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip
} from '@mui/material';
import {
    FlipCameraAndroid as FlipCameraIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, AddCard as AddCardIcon, Edit as EditIcon
} from '@mui/icons-material';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { processCardData } from './common';
import Loading from './Loading';
import CreditCardForm from './CreditCardForm';
import StateAlert from './StateAlert';
import ColorPicker from './ColorPicker';
import SettingsMenu from './SettingsMenu';

function App() {
    const backgroundColor = "#564bf5";
    const testCardData = [
        {
            "color": "#4a90e2",
            "code": "U2FsdGVkX1//yOJKIjXDkegmvJ7mfeezI8ikn195FrwYo/m2eH2n0DiqPQJ50W9N",
            "name": "U2FsdGVkX19KVJSYl8YRyBgxTBEQVhjljBYBsEQ2GH1idhxOeM7AF6Pqqt8XZva9",
            "cvv": "U2FsdGVkX1/s+fnSTjTpj9eou9ZMyGP/wJASOsqappI=",
            "expiry": "U2FsdGVkX1+v3sMmi2rqWReNQEwwbCtTK1fdt6SIH6o=",
            "type": "U2FsdGVkX19ONrMMwcV55u2qJhcft1Qlnm7Hhquif2s=",
            "brand": "U2FsdGVkX187OV8EVuNPAtZK2Zxq3VasQxYT0KaKqag=",
            "network_type": "U2FsdGVkX1/BpacFFO4qHTqqwy8/ntOPWDvx9N0nI70="
        },
        {
            "color": "#20354E",
            "code": "U2FsdGVkX19NMMaCJjK5cK8DCp9bprPSzED+8qmiYboV//3CyGQWMbVj39M+8bZy",
            "name": "U2FsdGVkX19afcwoYB+01wxIVw7p1fr5JMs2T6bihAg=",
            "cvv": "U2FsdGVkX1/EQ2trNt+IMh6dPhmz/LphTFI1SsDrtBI=",
            "expiry": "U2FsdGVkX1+DNzy06th+rcCmyPsD/pXI3IvKFsS5NrE=",
            "type": "U2FsdGVkX1+n4OXgqjX0RprB4mFDDOKjwStH8FNv71o=",
            "brand": "U2FsdGVkX18Sk+/HbsAZOmcly/NuqLMx3Ui3mgHa7GA=",
            "network_type": "U2FsdGVkX1/86+aTHlUXo8Z80YFOgm7ZeX7W4HxZF2E="
        },
        {
            "color": "#e74c3c",
            "code": "U2FsdGVkX1+AEuMI31ARgqrGlOIJ2Xou7e8bfFMEhjsiblWtvT2KdMvPYaLDI5Pn",
            "name": "U2FsdGVkX1+oXlNqB8Q1tI2QXsvQhJK+P5ueI9pSUdU=",
            "cvv": "U2FsdGVkX19fofCbO5ARCXhjb+8uZdADoc26vxctOc0=",
            "expiry": "U2FsdGVkX1+VyHTXFTRa/F9da4aR+HlOeggxj+Vr+dw=",
            "type": "U2FsdGVkX18PaboCok13AEOoXJ2KmYK2xk+Hi2co1NE=",
            "brand": "U2FsdGVkX1/NLdcoBjv6rme11rAiDrb/ETV/UO0s73s=",
            "network_type": "U2FsdGVkX1+flCkIhbcMiIWChnblwq+R5uhlEZUS/N4="
        },
        {
            "color": "#2ecc71",
            "code": "U2FsdGVkX18rqu9Z/1hp+KABnNrnt5cSMElmNlmQZsVfRXjM8iqh39fqK7p7kwxp",
            "name": "U2FsdGVkX185yEIZ7JudFZXwAteLwCsfjSkK4nNVZ7M=",
            "cvv": "U2FsdGVkX18iV745A0JVCdCY93HGHAFjFfVM/Up0ed4=",
            "expiry": "U2FsdGVkX18hXh6+yt8IVbJZQVFU6f9U8shdNzWSUzk=",
            "type": "U2FsdGVkX1+sUkCWgw/0T1atTRvJlbAJtmVPcm2RrZk=",
            "brand": "U2FsdGVkX1+jCc4ROaA+q5xfWvzju8Wh5dhr9pksAOQ=",
            "network_type": "U2FsdGVkX1+oALoLdqfiuoWb/90PsocOt4IiBJRmjuQ="
        },
        {
            "color": "mediumpurple",
            "code": "U2FsdGVkX19SZRSpifn/Rk6XR1wTewMxeqD6H483SRMYZg6bmZkJ9uCL7KmUCj5S",
            "name": "U2FsdGVkX187LvUrMMhCCcocJDHxEtK54zq+hfq90s8=",
            "cvv": "U2FsdGVkX1+mwFctZHN70RgT1VJ5MeznDyyhYRJkpeU=",
            "expiry": "U2FsdGVkX19UhlCIvFYrNFk7Ik2nEH/A+OfzuZCa0mE=",
            "type": "U2FsdGVkX1+JGL+siDBO6Wcf14n6bMkO3OyESCkAgus=",
            "brand": "U2FsdGVkX193Hz1h94Njf4yzpNwxgR3RB30fdZeBMWg=",
            "network_type": "U2FsdGVkX19iPF3CNEgFp/7UpVi1ZBJdSRlEYxUcJcY="
        },
        {
            "color": "black",
            "code": "U2FsdGVkX1+Di5NWUkVuJXZ9wOZtOTePGtQJGRxsfpcLuNJZ8HEVO0thuzW8RmvH",
            "name": "U2FsdGVkX191Ba7hMU4v0y3LTWs+qsb70DsqarXRkDY=",
            "cvv": "U2FsdGVkX1/1s4gu2K4dR7O3RJ8sh4lvXo+1iUbbRG0=",
            "expiry": "U2FsdGVkX1/wKubYyWmOqhuhHwyuvc139s9h9woU7IQ=",
            "type": "U2FsdGVkX18IFRN29BYQT2117AL121ojWZhhXPsla+E=",
            "brand": "U2FsdGVkX1820Q3thHlIm1s5e28VlTOUHoH2x9+Aayg=",
            "network_type": "U2FsdGVkX1/iWPhWPQ/WUk+D4z7z5ripukUFmVncWp0="
        }
    ];
    const [cardsData, setCardsData] = useState([]);

    const [showDataAtIndex, setShowDataAtIndex] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showKeyPopup, setShowKeyPopup] = useState(false);
    const [flipIndex, setFlipIndex] = useState([]);
    const label = {
        color: "Color", code: "Number", name: "Name", cvv: "CVV", expiry: "Expiry Date",
        network: "Network", brand: "Brand", network_type: "Network Type"
    };
    const placeHolder = {
        color: "grey", code: "1111222233334444", name: "xyz", cvv: "123", expiry: "MM/YY",
        network: "Visa/Rupay", brand: "HDFC/SBI", network_type: "Credit/Debit/MasteCard"
    };
    const [cardDetails, setCardDetails] = useState({
        color: "black", code: "", name: "", cvv: "", expiry: "",
        network: "", brand: "", network_type: ""
    });
    const [viewType, setViewType] = useState("");
    const [currentIndex, setCurrentIndex] = useState();
    const [userKey, setUserKey] = useState("");
    const [userKeyDur, setUserKeyDur] = useState(0);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [commonError, setCommonError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    const encryptData = (data) => CryptoJS.AES.encrypt(data, userKey).toString();
    const decryptData = (encryptedData) => {
        try {
            return CryptoJS.AES.decrypt(encryptedData, userKey).toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return "";
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            saveToken(code);
        } else if (localStorage.getItem("access_token")) {
            fetchCardData();
        } else {
            setCardsData([]);
            setCommonError("No data available.");
        }
    }, []);

    const saveToken = async (code) => {
        try {
            setShowLoading(true);
            const response = await fetch('http://localhost:8888/.netlify/functions/googleAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code })
            });
            const data = await response.json();
            localStorage.setItem("access_token", data.response.tokens.access_token);
            localStorage.setItem("refresh_token", data.response.tokens.refresh_token);
            localStorage.setItem("expiryDate", data.response.tokens.expiry_date);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        } finally {
            setShowLoading(false);
            window.location.href = "/";
        }
    };

    const fetchCardData = async () => {
        try {
            setShowLoading(true);
            const response = await processCardData("fetch");
            setCardsData(response);
            if (response.length === 0) {
                setCommonError("No data available.");
            }
        } catch (error) {
            setCardsData([]);
            setCommonError(`Error fetching card data: ${error.message}`);
        } finally {
            setShowLoading(false);
        }
    };

    const updateCardData = async (content) => {
        try {
            setShowLoading(true);
            const response = await processCardData("update", content);
            setCardsData(response);
            if (response.length === 0) {
                setCommonError("No data available.");
            }
        } catch (error) {
            setCardsData([]);
            setCommonError(`Error updating card data: ${error.message}`);
        } finally {
            setShowLoading(false);
        }
    };

    const flipCard = (index) => setFlipIndex(flipIndex.includes(index) ? flipIndex.filter(i => i !== index) : [...flipIndex, index]);

    const toggleDataVisibility = (index) => {
        setShowDataAtIndex(showDataAtIndex.includes(index) ? showDataAtIndex.filter(i => i !== index) : [...showDataAtIndex, index]);
    };

    const UrgeWithPleasureComponent = useCallback(({ duration }) => (
        <CountdownCircleTimer
            strokeWidth={4}
            size={40}
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
                setUserKeyDur(0);
                setUserKey("");
                setShowDataAtIndex([]);
            }}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    ), [userKey]);

    const handleAddCard = () => {
        setCardsData([...cardsData, {}]);
        setShowPopup(false);
    };

    const handleClose = () => {
        setUserKeyDur(10);
        setShowPopup(false);
    };

    const marks = React.useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            value: (i + 1) * 10,
            label: `${(i + 1) * 10}s`,
        }));
    }, []);

    const revealData = (action, index) => {
        if (action) setViewType(action);
        if (index !== undefined) setCurrentIndex(index);

        if (userKey) {
            if (action === 'edit') {
                const card = cardsData[index];
                setCardDetails({
                    color: card.color,
                    code: decryptData(card.code),
                    name: decryptData(card.name),
                    cvv: decryptData(card.cvv),
                    expiry: decryptData(card.expiry),
                    network: decryptData(card.network),
                    brand: decryptData(card.brand),
                    network_type: decryptData(card.network_type)
                });
                setShowPopup(true);
            } else {
                toggleDataVisibility(index);
            }
        } else {
            if (showDataAtIndex.includes(index)) {
                toggleDataVisibility(index);
            } else {
                setShowKeyPopup(true);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const [alertState, setAlertState] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("none");

    const invokeAlert = (state, type, message) => {
        setAlertState(state);
        setAlertType(type);
        setAlertMessage(message);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: backgroundColor, borderBottom: "6px solid black" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>My Cards</Typography>
                        {userKeyDur > 0 && userKey && <UrgeWithPleasureComponent duration={userKeyDur} />}
                        <IconButton sx={{
                            color: "white", marginLeft: "1rem", '&:hover': {
                                backgroundColor: "black"
                            }
                        }} onClick={() => setShowPopup(true)}><AddCardIcon /></IconButton>
                        <SettingsMenu invokeAlert={invokeAlert} setShowLoading={setShowLoading} setCardsData={setCardsData} setCommonError={setCommonError} />
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="content">
                {cardsData.length === 0 ? <Typography variant="h6" sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
                    {commonError === "No data available." ?
                        <Chip label="Add Card" variant="outlined" onClick={() => setShowPopup(true)} icon={<AddCardIcon fontSize='large' />} size='medium' sx={{
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
                                <div className={`card ${flipIndex.includes(index) ? 'flipped' : ''}`}>
                                    <div className="card-front" style={{ backgroundColor: card.color }}>
                                        <div className="card-brand">{showDataAtIndex.includes(index) ? decryptData(card.brand) : "*****"}</div>
                                        <div className="card-number">{showDataAtIndex.includes(index) ? decryptData(card.code).replace(/(\d{4})(?=\d)/g, '$1 ').trim() : "**** **** **** ****"}</div>
                                        <div className="card-info">
                                            <div className="card-name">{showDataAtIndex.includes(index) ? decryptData(card.name) : "***** ********"}</div>
                                            <div className="card-expiry">{showDataAtIndex.includes(index) ? decryptData(card.expiry) : "**/**"}</div>
                                        </div>
                                        <CardIcons
                                            showDataAtIndex={showDataAtIndex}
                                            index={index}
                                            revealData={revealData}
                                            flipCard={flipCard}
                                        />
                                        <div className="card-type">{showDataAtIndex.includes(index) ? decryptData(card.type) : "**********"}</div>
                                        <div className="card-label">{showDataAtIndex.includes(index) ? decryptData(card.network_type) : "******"}</div>
                                    </div>
                                    <div className="card-back">
                                        <div className="card-barcode"></div>
                                        <CardIcons
                                            showDataAtIndex={showDataAtIndex}
                                            index={index}
                                            revealData={revealData}
                                            flipCard={flipCard}
                                        />
                                        <div className="card-cvv">{showDataAtIndex.includes(index) ? `CVV: ${decryptData(card.cvv)}` : "CVV: ***"}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <Dialog
                open={showKeyPopup}
            >
                <DialogTitle>Key</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus required margin="dense" id="cardKey" name="cardKey" label="Key"
                        type="password" fullWidth variant="standard" value={userKey}
                        onChange={(e) => {
                            setUserKey(e.target.value)
                        }}
                        error={error}
                        helperText={errorMsg}
                    />
                    {viewType !== "edit" && <Box sx={{ width: 300, marginTop: 2 }}>
                        <Typography variant="body2" gutterBottom>Time to Destroy</Typography>
                        <Slider name="timeToDestroy" defaultValue={30} step={10} min={10} marks={marks} valueLabelDisplay="auto" value={userKeyDur} onChange={(event, newValue) => setUserKeyDur(newValue)} />
                    </Box>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setError(true);
                        setShowKeyPopup(false);
                    }}>Close</Button>
                    <Button onClick={() => {
                        if (userKey.length < 10) {
                            setError(true);
                            setErrorMsg('Minimum 10 characters required')
                            return;
                        }
                        if (decryptData(cardsData[currentIndex].code).length !== 16) {
                            setError(true);
                            setErrorMsg('Invalid Key')
                            return;
                        }
                        setError(false);
                        setErrorMsg("");
                        if (userKeyDur === 0 && viewType !== "edit") {
                            setUserKeyDur(10);
                        }
                        setShowKeyPopup(false);
                        revealData(viewType, currentIndex);
                    }}>{viewType === "edit" ? "Edit" : "Show"}</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showPopup}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                    sx: {
                        borderRadius: '12px', // Rounded corners for a retro touch
                        boxShadow: `8px 8px 0px ${backgroundColor}`, // Warm burnt orange shadow
                        border: "6px solid black",
                        '& .MuiDialogTitle-root': {
                            fontWeight: '800', // Bold title text
                        },
                        '& .MuiDialogContent-root': {
                            padding: '16px', // Padding for dialog content
                        },
                        '& .MuiButton-root': {
                            fontWeight: '800', // Bold title text
                            color: 'black', // Button text color
                            borderColor: 'black', // Button border color
                            '&:hover': {
                                fontWeight: '800', // Bold title text
                                color: 'white', // Button text color
                                backgroundColor: 'black', // Darker olive green for hover
                            },
                        },
                    },
                }}
            >
                <DialogTitle>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: "800" }}>
                        <span>{cardDetails.code ? "Add Card" : "Edit Card"}</span>
                        <ColorPicker color={cardDetails.color} setColor={handleInputChange} />
                    </span>
                </DialogTitle>
                <DialogContent>
                    <CreditCardForm handleInputChange={handleInputChange} label={label} placeHolder={placeHolder} cardDetails={cardDetails} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        let newData = {
                            code: encryptData(cardDetails.code),
                            name: encryptData(cardDetails.name),
                            cvv: encryptData(cardDetails.cvv),
                            expiry: encryptData(cardDetails.expiry),
                            brand: cardDetails.brand ? encryptData(cardDetails.brand) : cardDetails.brand,
                            network: cardDetails.network ? encryptData(cardDetails.network) : cardDetails.network,
                            network_type: cardDetails.network_type ? encryptData(cardDetails.network_type) : cardDetails.network_type,
                            color: cardDetails.color
                        }
                        let index = currentIndex;
                        let finalData;
                        if (viewType !== "edit") {
                            finalData = [...cardsData, newData];
                            setCardsData(finalData);
                        } else {
                            finalData = [...cardsData];
                            finalData[index] = { ...finalData[index], ...newData };
                            setCardsData(finalData);
                        }
                        updateCardData(finalData);
                    }}>{viewType === "edit" ? "Save" : "Add"}</Button>
                </DialogActions>
            </Dialog>
            <StateAlert state={alertState} type={alertType} message={alertMessage} setAlertState={setAlertState} />
            <footer className="footer">
                <p>All card details are stored in an encrypted format.</p>
            </footer>
            <Loading show={showLoading} />
        </>
    );
}

function CardIcons({ showDataAtIndex, index, revealData, flipCard }) {
    return (
        <>
            <IconButton className="edit-icon" onClick={() => {
                revealData("edit", index)
            }}>
                <EditIcon />
            </IconButton>
            <IconButton className='ai-icon' onClick={() => {
                revealData("show", index)
            }}>
                {showDataAtIndex.includes(index) ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton className='flip-icon' onClick={() => flipCard(index)}>
                <FlipCameraIcon fontSize="large" />
            </IconButton>
        </>
    )
}

export default App;