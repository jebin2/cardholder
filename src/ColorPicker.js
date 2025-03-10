import React, {useCallback} from 'react';
import {
    Typography, IconButton, Popover
} from '@mui/material';
import './App.css';
import { HexColorPicker } from "react-colorful";
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

export default React.memo(function ColorPicker({ color, setColor }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChange = useCallback((color) => {
        setColor({ target: { value: color, name: "color" } });
      }, [setColor]);

    return (
        <div>
            <IconButton sx={{ textTransform: 'none' }} aria-describedby={id} variant="contained" onClick={handleClick}>
                <FormatPaintIcon fontSize='large' sx={{
                    padding: "5px",
                    color: "black",
                    '&:hover': {
                        borderRadius: "20px",
                        fontWeight: '800', // Bold title text
                        color: 'white', // Button text color
                        backgroundColor: 'black', // Darker olive green for hover
                    },
                }} />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                disableRestoreFocus
            >
                <div style={{padding: "10px"}}>
                    <HexColorPicker color={color} onChange={handleChange} />
                </div>
            </Popover>
        </div>
    );
});