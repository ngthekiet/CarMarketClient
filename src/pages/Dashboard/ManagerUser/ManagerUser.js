import * as React from 'react';
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {FormControl, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

import UserService from "~/services/userServices";
import Notify from "~/components/Notify";


function ManagerUser() {
    const [data, setData] = useState([])
    const [change, setChange] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        setChange(false)
        const fetchData = async () => {
            try {
                const response = await UserService.getUsers()
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [change])

    const handleChangeRole = async (id, role) => {
        try {
            await UserService.updateRole(id, role)
            setChange(true)
            Notify.notifySuccess(t("updatesuccess"))
        } catch (error) {
            Notify.notifyError(t("updatefail"))
        }
    }

    const columns = [
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-username")}</div>,
            selector: row => row.username,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("profile-lastname")}</div>,
            selector: row => row.lastname,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Email</div>,
            selector: row => row.email,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-phone")}</div>,
            selector: row => row.phone,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-role")}</div>,
            selector: row =>
                <FormControl variant="standard" size={"small"}>
                    <Select style={{fontSize: "100%", fontWeight: "bold"}}
                            value={row.role}
                            onChange={(e) => {
                                handleChangeRole(row.id, e.target.value)
                            }}
                    >
                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                        <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                        <MenuItem value={"USER"}>USER</MenuItem>
                    </Select>
                </FormControl>
            ,
            style: {
                justifyContent: "center"
            }
        }
    ]

    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{zIndex: 0}}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {t("db-manageuser")}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
                <Tabs value={0} textColor="inherit">
                    <Tab label={t("db-users")}/>
                </Tabs>
            </AppBar>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{display: 'block'}}/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder={t("share-search")}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Reload">
                                <IconButton onClick={() => {
                                    setChange(true)
                                }}>
                                    <RefreshIcon color="inherit" sx={{display: 'block'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <DataTable columns={columns}
                       data={data}
                       pagination={true}
                       highlightOnHover={true}
            />
        </Paper>
    )
}

export default ManagerUser
