import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function InfoDialog({ backgroundColor, open, setOpen }) {
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
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Info</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
                All card details are stored in an encrypted format.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} color="primary">
                    Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
