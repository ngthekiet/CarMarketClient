import * as React from 'react';
import {useEffect, useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import {NumericFormat} from "react-number-format";
import DataTable from "react-data-table-component";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useTranslation} from "react-i18next";

import config from "~/config";
import ProductService from "~/services/productServices";
import Notify from "~/components/Notify";

function ManagerProduct() {

    const [data, setData] = useState([])
    const [change, setChange] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            setChange(false)
            try {
                const response = await ProductService.getAllProducts()
                if (response?.data)
                    setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [change])

    const handleReset = () => {
        setChange(true)
    }

    const handleDeleteProduct = async (pid) => {
        try {
            await ProductService.deleteProduct(pid)
            setChange(true)
            Notify.notifySuccess(t("deletesuccess"))
        } catch (error) {
            Notify.notifyError(t("deletefail"))
        }
    }

    const columns = [
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-image")}</div>,
            selector: row => <img style={{width: "100px", height: "100px", margin: "0"}} src={row.image} alt={""}/>,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-name")}</div>,
            sortable: true,
            selector: row => <Link to={`/detail/${row.id}`}>{row.name}</Link>,
            style: {
                justifyContent: "center",
                color: "#009be5",
                fontWeight: "bold"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-price")}</div>,
            sortable: true,
            selector: row => <NumericFormat value={row.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={"$"}/>,
            style: {
                justifyContent: "center"
            }
        },
        {
            name: <div style={{margin: "0 auto", fontWeight: "bold", fontSize: "120%"}}>{t("share-action")}</div>,
            selector: row =>
                <div>
                    <Link to={`/dashboard/product/edit/${row.id}`}>
                        <Button style={{margin: "5px"}} variant="outlined" startIcon={<MdEdit/>}>
                            {t("share-edit")}
                        </Button>
                    </Link>
                    <Button onClick={() => {
                        handleDeleteProduct(row.id)
                    }} style={{margin: "5px"}} variant="outlined"
                            startIcon={<MdDelete/>} color={"error"}>
                        {t("share-delete")}
                    </Button>
                </div>,
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
                                {t("db-manageproduct")}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
                <Tabs value={0} textColor="inherit">
                    <Tab label={t("db-products")}/>
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
                            <Link to={config.routes.addProduct}>
                                <Button variant="contained" sx={{mr: 1}}>
                                    {t("share-addproduct")}
                                </Button>
                            </Link>
                            <Tooltip title="Reload">
                                <IconButton onClick={handleReset}>
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

export default ManagerProduct
