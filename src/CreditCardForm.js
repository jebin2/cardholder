import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, TextField, Paper, Grid, Divider
} from '@mui/material';
import './App.css';
import { styled } from '@mui/system';

export default function CreditCardForm({ handleInputChange, label, placeHolder, cardDetails }) {
    const CardContainer = styled(Paper)(({ theme, bgcolor }) => ({
        padding: theme.spacing(2),
        maxWidth: 360,
        margin: 'auto',
        backgroundColor: bgcolor,
        color: 'white', // Text color
        boxShadow: 'none', // Remove shadow for minimalist style
        borderRadius: '12px',
    }));

    const Label = styled(Typography)(({ theme }) => ({
        marginBottom: theme.spacing(0.5),
        fontWeight: 500,
        fontSize: '0.9rem', // Smaller font size
    }));

    const CustomTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.4)', // Subtle white border
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)', // Slightly stronger on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white', // White border when focused
            },
        },
        '& .MuiInputBase-input': {
            color: 'white', // White text color
            fontSize: '0.9rem', // Smaller font size for input
        },
        '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)', // Subtle placeholder color
            opacity: 1,
        },
        '& .MuiFormLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)', // Subtle label color
            '&.Mui-focused': {
                color: 'white', // White label color when focused
            },
        },
    }));
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        switch (name) {
            case 'code':
                newValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                break;
            case 'expiry':
                newValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
                break;
            case 'cvv':
                newValue = value.replace(/\D/g, '').substr(0, 3);
                break;
            default:
                break;
        }
        handleInputChange({ target: { name, value: newValue } });
    };
    const [activeField, setActiveField] = useState(null);
    const inputRefs = {
        code: useRef(null),
        expiry: useRef(null),
        cvv: useRef(null),
        name: useRef(null),
        brand: useRef(null),
        network: useRef(null),
        network_type: useRef(null)
    };
    useEffect(() => {
        if (inputRefs.code.current) {
            inputRefs.code.current.focus();
        }
    }, []);
    const handleFocus = (fieldName) => {
        setActiveField(fieldName);
        if (inputRefs[fieldName].current) {
            inputRefs[fieldName].current.focus();
        }
    };
    useEffect(() => {
        if (activeField && inputRefs[activeField].current) {
            inputRefs[activeField].current.focus();
        }
    }, [activeField, cardDetails]);
    const renderContainerTextField = (name, maxLength = null) => (
        <CustomTextField
            inputRef={inputRefs[name]}
            name={name}
            placeholder={placeHolder[name]}
            value={cardDetails[name]}
            fullWidth
            variant="outlined"
            inputProps={{
                maxLength: maxLength,
                inputMode: 'numeric'
            }}
            onChange={handleChange}
            onFocus={() => handleFocus(name)}
        />
    );
    const renderTextField = (name, maxLength = null) => (
        <TextField
            inputRef={inputRefs[name]}
            name={name}
            placeholder={placeHolder[name]}
            value={cardDetails[name]}
            fullWidth
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: "12px"
                }
            }}
            inputProps={{
                maxLength: maxLength
            }}
            onChange={handleChange}
            onFocus={() => handleFocus(name)}
        />
    );
    return (
        <>
            <CardContainer bgcolor={cardDetails.color}>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Label>{label["code"]}</Label>
                            {renderContainerTextField("code", 19)}
                        </Grid>
                        <Grid item xs={6}>
                            <Label>{label["expiry"]}</Label>
                            {renderContainerTextField("expiry", 5)}
                        </Grid>
                        <Grid item xs={6}>
                            <Label>{label["cvv"]}</Label>
                            {renderContainerTextField("cvv", 3)}
                        </Grid>
                        <Grid item xs={12}>
                            <Label>{label["name"]}</Label>
                            {renderContainerTextField("name", 20)}
                        </Grid>
                    </Grid>
                </Box>
            </CardContainer>
            <Box sx={{ marginTop: "40px", maxWidth: 360, margin: 'auto' }}>
                <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.12)', marginBottom: "15px" }} />
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Label>{label["brand"]}(Optional)</Label>
                            {renderTextField("brand", 12)}
                        </Grid>
                        <Grid item xs={6}>
                            <Label>{label["network"]}(Optional)</Label>
                            {renderTextField("network", 12)}
                        </Grid>
                        <Grid item xs={6}>
                            <Label>{label["network_type"]}(Optional)</Label>
                            {renderTextField("network_type", 12)}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}