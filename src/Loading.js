import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

function Loading({ show }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fade background
                display: show ? 'flex' : "none",
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // Ensure it appears on top of other content
            }}
        >
            <CircularProgress
                sx={{
                    animationDuration: '550ms',
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
            />
        </Box>
    );
}

export default Loading;