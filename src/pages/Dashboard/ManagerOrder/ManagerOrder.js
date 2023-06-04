import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {FormControl, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import {BiDetail} from "react-icons/bi";
import Moment from 'moment';

import OrderService from "~/services/orderServices";
import notify from "~/components/Notify";

function ManagerOrder() {
    const [data, setData] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        setChange(false)
        const fetchData = async () => {
            try {
                const response = await OrderService.getAllOrder()
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [change])

    const handleChangeStatus = async (id, status) => {
        try {
            await OrderService.updateStatus(id, status)
            setChange(true)
            notify.notifySuccess("Cập nhật thành công")
        } catch (error) {
            notify.notifyError("Cập nhật thất bại")
        }
    }

    const columns = [
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>N.O</div>,
            selector: row => row.id,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Bought By</div>,
            selector: row => row.user.lastname,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Purchase Date</div>,
            selector: row => Moment(row.createDate).format('DD/MM/yyyy HH:mm:ss'),
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Last Update</div>,
            selector: row => Moment(row.updateDate).format('DD/MM/yyyy HH:mm:ss'),
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Status</div>,
            selector: row =>
                <FormControl variant="standard" size={"small"}>
                    <Select style={{fontSize: "100%", fontWeight: "bold"}}
                            value={row.status}
                            onChange={(e) => {
                                handleChangeStatus(row.id, e.target.value)
                            }}
                    >
                        <MenuItem value={"Confirming"}>Confirming</MenuItem>
                        <MenuItem value={"Processing"}>Processing</MenuItem>
                        <MenuItem value={"Processed"}>Processed</MenuItem>
                        <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                    </Select>
                </FormControl>,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>Action</div>,
            selector: row =>
                <Link to={`/dashboard/order/detail/${row.id}`}>
                    <Button style={{margin: "5px"}} variant="outlined" startIcon={<BiDetail/>}>
                        Detail
                    </Button>
                </Link>,
            style: {
                justifyContent: "center"
            }
        },
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
                                Manager Orders
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
                <Tabs value={0} textColor="inherit">
                    <Tab label="Orders"/>
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
                                placeholder="Search by name, phone number, or user UID"
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

export default ManagerOrder