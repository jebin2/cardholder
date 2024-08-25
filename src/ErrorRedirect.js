import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box } from '@mui/material';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { truncateIndexedDB } from './common';

export default function ErrorRedirect({ type, message, backgroundColor }) {
	const [open, setOpen] = useState(true);

	const handleClose = async (event, reason) => {
		if (!["escapeKeyDown", "backdropClick"].includes(reason)) {
			if (type === "reset") {
				await truncateIndexedDB();
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				window.location.reload();
			} else {
				window.location.href = "/cardholder";
			}
		}
	};

	return (
		<Dialog
			PaperProps={{
				sx: {
					width: "340px",
					borderRadius: '12px',
					boxShadow: `8px 8px 0px ${backgroundColor}`,
					border: "6px solid black",
					'& .MuiDialogTitle-root': {
						fontWeight: '800',
						borderBottom: '2px solid black',
						padding: '16px',
					},
					'& .MuiDialogContent-root': {
						padding: '24px 16px',
					},
					'& .MuiButton-root': {
						fontWeight: '800',
						color: 'black',
						borderColor: 'black',
						'&:hover': {
							fontWeight: '800',
							color: 'white',
							backgroundColor: 'black',
							borderColor: 'black',
						},
					},
				},
			}}
			open={open}
			onClose={handleClose}
			aria-labelledby="error-dialog-title"
			aria-describedby="error-dialog-description"
		>
			<DialogTitle id="error-dialog-title">
				<Box display="flex" alignItems="center">
					{type === 'reset' ? <RefreshIcon style={{ color: "black", marginRight: '8px' }} /> : <ErrorIcon style={{ color: "black", marginRight: '8px' }} />}
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
					variant="outlined"
					startIcon={type === 'reset' && <RefreshIcon />}
					sx={{
						minWidth: '120px',
						transition: 'all 0.3s',
						'&:hover': {
							transform: 'translateY(-2px)',
						}
					}}
				>
					{type === 'reset' ? "Refresh Now" : "Okay"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}