import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Lock, Refresh, Info } from '@mui/icons-material';

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
						borderBottom: '2px solid black',
						padding: '16px',
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
							borderColor: 'black',
						},
					},
				},
			}}
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="info-dialog-title"
			aria-describedby="info-dialog-description"
		>
			<DialogTitle id="info-dialog-title">
				<Info fontSize="small" style={{ marginRight: '8px' }} />
				Important Information
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="info-dialog-description" component="div">
					<List>
						<ListItem>
							<ListItemIcon>
								<Lock fontSize="small" />
							</ListItemIcon>
							<ListItemText
								primary="Encrypted Storage"
								secondary="All card details are securely stored in an encrypted format."
							/>
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<Refresh fontSize="small" />
							</ListItemIcon>
							<ListItemText
								primary="Troubleshooting"
								secondary="If you encounter persistent issues, reset the app from settings. Note: Resetting removes data from local storage but not from Google Drive if synced."
							/>
						</ListItem>
					</List>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setOpen(false)}
					color="primary"
					variant="outlined"
					sx={{
						minWidth: '100px',
						transition: 'all 0.3s',
						'&:hover': {
							transform: 'translateY(-2px)',
						}
					}}
				>
					Got it
				</Button>
			</DialogActions>
		</Dialog>
	);
}