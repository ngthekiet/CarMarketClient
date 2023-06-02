import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";

import styles from "~/pages/Dashboard/ManagerProduct/AddProduct/AddProduct.module.scss"
import Button from "@mui/material/Button";
import * as React from "react";
import {Link} from "react-router-dom";
import config from "~/config";
import ProductInfo from "~/pages/Dashboard/ManagerProduct/ProductInfo";
import {useState} from "react";


function AddProduct() {
    const [actionAdd, setActionAdd] = useState(false)
    const changeActionAdd = (value) => {
        setActionAdd(value)
    }
    return (
        <div>
            <ProductInfo actionAdd={actionAdd} changeActionAdd={changeActionAdd}/>
            <Grid className={clsx(styles.action)} xs={4}>
                <Button onClick={() => {
                    setActionAdd(true)
                }} variant="contained" sx={{mr: 1}}>
                    Add
                </Button>
                <Link to={config.routes.managerProduct}>
                    <Button variant="outlined" color="error">
                        Cancel
                    </Button>
                </Link>
            </Grid>
        </div>
    )
}

export default AddProduct