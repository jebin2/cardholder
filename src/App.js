import React, { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import {
    AppBar, Box, Slider, Toolbar, Typography, Button, IconButton,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle, Popover
} from '@mui/material';
import {
    Settings as SettingsIcon, FlipCameraAndroid as FlipCameraIcon,
    Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, AddCard as AddCardIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import './App.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { HexColorPicker } from "react-colorful";

function App() {
    const [showDataAtIndex, setShowDataAtIndex] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showKeyPopup, setShowKeyPopup] = useState(false);
    const [flipIndex, setFlipIndex] = useState([]);
    const label = {
        color: "Color", code: "Number", name: "Name", cvv: "CVV", expiry: "Expiry Date",
        network: "Network", brand: "Brand", label: "Card Label"
    };
    const placeHolder = {
        color: "grey", code: "1111222233334444", name: "xyz", cvv: "123", expiry: "MM/YY",
        network: "Visa/Rupay", brand: "HDFC/SBI", label: "Credit/Debit/MasteCard"
    };
    const [cardDetails, setCardDetails] = useState({
        color: "", code: "", name: "", cvv: "", expiry: "",
        network: "", brand: "", label: ""
    });
    const [viewType, setViewType] = useState("");
    const [currentIndex, setCurrentIndex] = useState();
    const [userKey, setUserKey] = useState("");
    const [userKeyDur, setUserKeyDur] = useState(0);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const encryptData = (data) => CryptoJS.AES.encrypt(data, userKey).toString();
    const decryptData = (encryptedData) => {
        try {
            return CryptoJS.AES.decrypt(encryptedData, userKey).toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return "";
        }
    };

    const testCards = [
        {
            "color": "#4a90e2",
            "code": "U2FsdGVkX1//yOJKIjXDkegmvJ7mfeezI8ikn195FrwYo/m2eH2n0DiqPQJ50W9N",
            "name": "U2FsdGVkX19KVJSYl8YRyBgxTBEQVhjljBYBsEQ2GH1idhxOeM7AF6Pqqt8XZva9",
            "cvv": "U2FsdGVkX1/s+fnSTjTpj9eou9ZMyGP/wJASOsqappI=",
            "expiry": "U2FsdGVkX1+v3sMmi2rqWReNQEwwbCtTK1fdt6SIH6o=",
            "type": "U2FsdGVkX19ONrMMwcV55u2qJhcft1Qlnm7Hhquif2s=",
            "brand": "U2FsdGVkX187OV8EVuNPAtZK2Zxq3VasQxYT0KaKqag=",
            "label": "U2FsdGVkX1/BpacFFO4qHTqqwy8/ntOPWDvx9N0nI70="
        },
        {
            "color": "#20354E",
            "code": "U2FsdGVkX19NMMaCJjK5cK8DCp9bprPSzED+8qmiYboV//3CyGQWMbVj39M+8bZy",
            "name": "U2FsdGVkX19afcwoYB+01wxIVw7p1fr5JMs2T6bihAg=",
            "cvv": "U2FsdGVkX1/EQ2trNt+IMh6dPhmz/LphTFI1SsDrtBI=",
            "expiry": "U2FsdGVkX1+DNzy06th+rcCmyPsD/pXI3IvKFsS5NrE=",
            "type": "U2FsdGVkX1+n4OXgqjX0RprB4mFDDOKjwStH8FNv71o=",
            "brand": "U2FsdGVkX18Sk+/HbsAZOmcly/NuqLMx3Ui3mgHa7GA=",
            "label": "U2FsdGVkX1/86+aTHlUXo8Z80YFOgm7ZeX7W4HxZF2E="
        },
        {
            "color": "#e74c3c",
            "code": "U2FsdGVkX1+AEuMI31ARgqrGlOIJ2Xou7e8bfFMEhjsiblWtvT2KdMvPYaLDI5Pn",
            "name": "U2FsdGVkX1+oXlNqB8Q1tI2QXsvQhJK+P5ueI9pSUdU=",
            "cvv": "U2FsdGVkX19fofCbO5ARCXhjb+8uZdADoc26vxctOc0=",
            "expiry": "U2FsdGVkX1+VyHTXFTRa/F9da4aR+HlOeggxj+Vr+dw=",
            "type": "U2FsdGVkX18PaboCok13AEOoXJ2KmYK2xk+Hi2co1NE=",
            "brand": "U2FsdGVkX1/NLdcoBjv6rme11rAiDrb/ETV/UO0s73s=",
            "label": "U2FsdGVkX1+flCkIhbcMiIWChnblwq+R5uhlEZUS/N4="
        },
        {
            "color": "#2ecc71",
            "code": "U2FsdGVkX18rqu9Z/1hp+KABnNrnt5cSMElmNlmQZsVfRXjM8iqh39fqK7p7kwxp",
            "name": "U2FsdGVkX185yEIZ7JudFZXwAteLwCsfjSkK4nNVZ7M=",
            "cvv": "U2FsdGVkX18iV745A0JVCdCY93HGHAFjFfVM/Up0ed4=",
            "expiry": "U2FsdGVkX18hXh6+yt8IVbJZQVFU6f9U8shdNzWSUzk=",
            "type": "U2FsdGVkX1+sUkCWgw/0T1atTRvJlbAJtmVPcm2RrZk=",
            "brand": "U2FsdGVkX1+jCc4ROaA+q5xfWvzju8Wh5dhr9pksAOQ=",
            "label": "U2FsdGVkX1+oALoLdqfiuoWb/90PsocOt4IiBJRmjuQ="
        },
        {
            "color": "mediumpurple",
            "code": "U2FsdGVkX19SZRSpifn/Rk6XR1wTewMxeqD6H483SRMYZg6bmZkJ9uCL7KmUCj5S",
            "name": "U2FsdGVkX187LvUrMMhCCcocJDHxEtK54zq+hfq90s8=",
            "cvv": "U2FsdGVkX1+mwFctZHN70RgT1VJ5MeznDyyhYRJkpeU=",
            "expiry": "U2FsdGVkX19UhlCIvFYrNFk7Ik2nEH/A+OfzuZCa0mE=",
            "type": "U2FsdGVkX1+JGL+siDBO6Wcf14n6bMkO3OyESCkAgus=",
            "brand": "U2FsdGVkX193Hz1h94Njf4yzpNwxgR3RB30fdZeBMWg=",
            "label": "U2FsdGVkX19iPF3CNEgFp/7UpVi1ZBJdSRlEYxUcJcY="
        },
        {
            "color": "black",
            "code": "U2FsdGVkX1+Di5NWUkVuJXZ9wOZtOTePGtQJGRxsfpcLuNJZ8HEVO0thuzW8RmvH",
            "name": "U2FsdGVkX191Ba7hMU4v0y3LTWs+qsb70DsqarXRkDY=",
            "cvv": "U2FsdGVkX1/1s4gu2K4dR7O3RJ8sh4lvXo+1iUbbRG0=",
            "expiry": "U2FsdGVkX1/wKubYyWmOqhuhHwyuvc139s9h9woU7IQ=",
            "type": "U2FsdGVkX18IFRN29BYQT2117AL121ojWZhhXPsla+E=",
            "brand": "U2FsdGVkX1820Q3thHlIm1s5e28VlTOUHoH2x9+Aayg=",
            "label": "U2FsdGVkX1/iWPhWPQ/WUk+D4z7z5ripukUFmVncWp0="
        }
    ];

    const [cardsData, setCardsData] = useState(testCards);

    const flipCard = (index) => setFlipIndex(flipIndex.includes(index) ? flipIndex.filter(i => i !== index) : [...flipIndex, index]);

    const toggleDataVisibility = (index) => {
        setShowDataAtIndex(showDataAtIndex.includes(index) ? showDataAtIndex.filter(i => i !== index) : [...showDataAtIndex, index])
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
        setCardsData([...cardsData, newCard]);
        setShowPopup(false);
    };

    const handleClose = () => {
        setUserKeyDur(10);
        setShowPopup(false);
    }
    let marks = [];
    const marksGen = () => {
        for (var i = 10; i <= 100; i += 10) {
            marks.push({
                value: i,
                label: i + "s"
            })
        }
    };
    marksGen();

    const revealData = (action, index) => {
        if (action) {
            setViewType(action);
        }
        if (index !== undefined) {
            setCurrentIndex(index);
        }
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
                    label: decryptData(card.label)
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

    const handleInputChange = (event) => setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>My Cards</Typography>
                        {userKeyDur > 0 && userKey ? <UrgeWithPleasureComponent duration={userKeyDur} /> : ''}
                        <IconButton sx={{ color: "white", marginLeft: "1rem" }} onClick={() => setShowPopup(true)}><AddCardIcon /></IconButton>
                        <IconButton sx={{ color: "white", marginLeft: "1rem" }}><SettingsIcon /></IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="content">
                <div className="cards-grid">
                    {cardsData.map((card, index) => (
                        <div key={index} className="card-container">
                            <div className={`card ${flipIndex.includes(index) ? 'flipped' : ''}`}>
                                <div className="card-front" style={{ backgroundColor: card.color }}>
                                    <div className="card-brand">{showDataAtIndex.includes(index) ? decryptData(card.brand) : "*****"}</div>
                                    <div className="card-number">{showDataAtIndex.includes(index) ? decryptData(card.code).replace(/(\d{4})(?=\d)/g, '$1 ').trim() : "**** **** **** ****"}</div>
                                    <div class="card-info">
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
                                    <div className="card-label">{showDataAtIndex.includes(index) ? decryptData(card.label) : "******"}</div>
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
                }}
            >
                <DialogTitle>{cardDetails.code ? "Add Card" : "Edit Card"}</DialogTitle>
                <DialogContent>
                    {Object.keys(label).map((name, i) => (
                        ["color"].includes(name) ?
                            <div style={{
                                display: "flex"
                            }}>
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    key={i}
                                    autoFocus
                                    required
                                    margin="dense"
                                    name={name}
                                    label={label[name]}
                                    placeholder={placeHolder[name]}
                                    type="text"
                                    sx={{
                                        width: "40%"
                                    }}
                                    variant="standard"
                                    value={cardDetails[name]}
                                />
                                <BasicPopover setColor={(color) => setCardDetails({ ...cardDetails, color: color })} />
                            </div>
                            :
                            <TextField
                                key={i}
                                autoFocus
                                required
                                margin="dense"
                                name={name}
                                label={label[name]}
                                placeholder={placeHolder[name]}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={cardDetails[name]}
                                onChange={(e) => {
                                    if (e.target.value.length > 16) {
                                        return;
                                    }
                                    if (
                                        ["code", "cvv"].includes(name) && isNaN(e.target.value) ||
                                        "code" === name && e.target.value.length > 16 ||
                                        "cvv" === name && e.target.value.length > 3) {
                                        return;
                                    }
                                    if (name === "expiry") {
                                        if ((e.target.value.length === 1 || e.target.value.length === 2) && (isNaN(e.target.value.length) || Number(e.target.value) > 31)) {
                                            return;
                                        }
                                        if (e.target.value.length === 3 && !e.target.value.endsWith("/")) {
                                            return;
                                        }
                                        if (e.target.value.length > 3 && e.target.value.endsWith("/")) {
                                            return;
                                        }
                                        if ((e.target.value.length === 4 || e.target.value.length === 5)) {
                                            let mmayy = e.target.value.split("/");
                                            if (
                                                isNaN(mmayy[0]) ||
                                                isNaN(mmayy[1]) ||
                                                Number(mmayy[1]) > 12
                                            ) {
                                                return;
                                            }
                                        }
                                        if (e.target.value.length > 5) {
                                            return;
                                        }
                                    }
                                    handleInputChange(e);
                                }}
                            />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        let newData = {
                            code: encryptData(cardDetails.code),
                            name: encryptData(cardDetails.name),
                            cvv: encryptData(cardDetails.cvv),
                            expiry: encryptData(cardDetails.expiry),
                            brand: encryptData(cardDetails.brand),
                            name: encryptData(cardDetails.name),
                            type: encryptData(cardDetails.type)
                        }
                        let index = currentIndex;
                        if (viewType !== "edit") {
                            setCardsData([...cardsData, ...newData]);
                        } else {
                            const updatedCardsData = [...cardsData];
                            updatedCardsData[index] = { ...updatedCardsData[index], ...newData };
                            setCardsData(updatedCardsData);
                        }
                        handleClose();
                    }}>{viewType === "edit" ? "Save" : "Add"}</Button>
                </DialogActions>
            </Dialog>

            <footer className="footer">
                <p>All card details are stored in an encrypted format.</p>
            </footer>
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

function BasicPopover({ setColor }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Set Color
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <HexColorPicker onChange={setColor} />
                </Typography>
            </Popover>
        </div>
    );
}

export default App;