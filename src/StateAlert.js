import React from 'react';
import {
    Snackbar, Alert
} from '@mui/material';

export default function StateAlert({ state, type, message, setAlertState }) {
    return (
        <Snackbar open={state} autoHideDuration={5000} onClose={() => setAlertState(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={() => setAlertState(false)} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}