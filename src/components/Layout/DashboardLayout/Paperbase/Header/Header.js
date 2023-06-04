import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import clsx from "clsx";

import config from "~/config";
import AuthService from "~/services/authServices";
import {Avatar as useAvatar, Usa, Vn} from "~/assert/images"
import styles from "~/components/Layout/DashboardLayout/Paperbase/Header/Header.module.scss"

function Header(props) {
    const {onDrawerToggle} = props;
    const {i18n, t} = useTranslation()
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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

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
                                {t("share-logout")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{p: 0.5}}>
                                <Avatar className={clsx(styles.avatar)} src={avatar} alt="My Avatar"/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <div className={clsx(styles.language)}>
                                <a onClick={() => {
                                    changeLanguage("vi")
                                }
                                } className={clsx(styles.linkIcon)}><img className={clsx(styles.languageIcon)}
                                                                         src={Vn}/></a>
                                <a onClick={() => {
                                    changeLanguage("en")
                                }
                                } className={clsx(styles.linkIcon)}><img className={clsx(styles.languageIcon)}
                                                                         src={Usa}/></a>
                            </div>
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
