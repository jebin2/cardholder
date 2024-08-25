import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function ErrorRedirect({ message, backgroundColor	 }) {
	const [open, setOpen] = useState(true);

	const handleClose = (event, reason) => {
		if(!["escapeKeyDown", "backdropClick"].includes(reason)) {
            window.location.href = "/cardholder";
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
				},
				'& .MuiDialogContent-root': {
					padding: '16px',
				},
				'& .MuiButton-root': {
					fontWeight: '800',
					color: 'black',
					borderColor: 'black',
					'&:hover': {
						fontWeight: '800',
						color: 'white',
						backgroundColor: 'black',
					},
				},
			},
		}}
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Error</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" sx={{
					fontWeight: "800"
				}}>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Refresh
				</Button>
			</DialogActions>
		</Dialog>
	);
}
