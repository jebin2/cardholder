import React from 'react';
import {
	Snackbar, Alert
} from '@mui/material';

export default function StateAlert({ backgroundColor, state, type, message, setAlertState }) {
	return (
		<Snackbar open={state} autoHideDuration={5000} onClose={() => setAlertState(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			sx={{
				'& .MuiPaper-root': {
					background: `${backgroundColor}`,
					border: "6px solid black",
					color: "white",
					fontWeight: "900",
					'& .MuiAlert-icon': {
						color: "white",
						fontWeight: "900",
					},
					'& .MuiAlert-action': {
						'& .MuiIconButton-root': {
							color: "white",
							fontWeight: "900",
						}
					}
				}
			}}
		>
			<Alert onClose={() => setAlertState(false)} severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
}