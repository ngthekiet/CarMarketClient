import {Link, useParams} from "react-router-dom";
import ProductInfo from "~/pages/Dashboard/ManagerProduct/ProductInfo";
import clsx from "clsx";
import styles from "~/pages/Dashboard/ManagerProduct/AddProduct/AddProduct.module.scss";
import Button from "@mui/material/Button";
import config from "~/config";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import {useState} from "react";

function EditProduct() {
    const {id} = useParams()
    const [actionEdit, setActionEdit] = useState(false)
    const changeActionEdit = (value) => {
        setActionEdit(value)
    }
    return (
        <div>
            <ProductInfo editId={id} actionEdit={actionEdit} changeActionEdit={changeActionEdit}/>
            <Grid className={clsx(styles.action)} xs={4}>
                <Button onClick={() => {
                    setActionEdit(true)
                }} variant="contained" sx={{mr: 1}}>
                    Edit
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

export default EditProduct