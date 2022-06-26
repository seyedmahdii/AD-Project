import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useStyles from "./styles";

const CustomizedSnackbar = ({ open, setOpen, type, message }) => {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        // <div className={classes.root}>
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={type}
                    elevation={6}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbar;
