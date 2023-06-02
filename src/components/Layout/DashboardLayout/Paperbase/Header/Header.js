import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Link} from "react-router-dom";
import config from "~/config";
import AuthService from "~/services/authServices";
import {useEffect, useState} from "react";
import {Avatar as useAvatar} from "~/assert/images"

function Header(props) {
    const {onDrawerToggle} = props;
    const [avatar, setAvatar] = useState("")

    const handleLogout = () => {
        AuthService.logout()
    }

    useEffect(() => {
        const img = localStorage.getItem("avatar")
        if (img === "null") {
            setAvatar(useAvatar)
            return
        }
        setAvatar(img)
    }, [])

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                            <Link onClick={handleLogout} to={config.routes.account}>
                                Logout
                            </Link>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{p: 0.5}}>
                                <Avatar src={avatar} alt="My Avatar"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
