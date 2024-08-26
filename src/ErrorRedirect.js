import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box } from '@mui/material';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { truncateIndexedDB, dialogSx, buttonSx } from './common';

export default function ErrorRedirect({ type, message }) {
	const [open, setOpen] = useState(true);

	const handleClose = async (event, reason) => {
		if (!["escapeKeyDown", "backdropClick"].includes(reason)) {
			if (type === "reset") {
				await truncateIndexedDB();
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
			}
			window.location.href = "/cardholder";
		}
	};

    let localDialogSX = dialogSx();

	return (
		<Dialog
			PaperProps={{
				sx: localDialogSX,
			}}
			open={open}
			onClose={handleClose}
			aria-labelledby="error-dialog-title"
			aria-describedby="error-dialog-description"
		>
			<DialogTitle id="error-dialog-title">
				<Box display="flex" alignItems="center">
					{type === 'reset' ? <></> : <ErrorIcon style={{ color: "black", marginRight: '8px' }} />}
					<Typography variant="h6" component="span">{type === 'reset' ? "App Reset" : "Error Occurred"}</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText variant="body2" sx={{ fontWeight: "600", marginTop: 2 }}>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					color="primary"
					sx={buttonSx}
				>
					{type === 'reset' ? "Reset Now" : "Okay"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}