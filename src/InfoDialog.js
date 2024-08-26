import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Lock, Refresh, Info } from '@mui/icons-material';
import { dialogSx, buttonSx } from './common';

export default function InfoDialog({ open, setOpen }) {

    let localDialogSX = dialogSx();

	return (
		<Dialog
			PaperProps={{
				sx: localDialogSX,
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
					sx={buttonSx}
				>
					Got it
				</Button>
			</DialogActions>
		</Dialog>
	);
}