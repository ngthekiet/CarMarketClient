import * as React from "react";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import clsx from "clsx";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";

import ProductInfo from "~/pages/Dashboard/ManagerProduct/ProductInfo";
import styles from "~/pages/Dashboard/ManagerProduct/AddProduct/AddProduct.module.scss";
import config from "~/config";

function EditProduct() {
    const {id} = useParams()
    const [actionEdit, setActionEdit] = useState(false)
    const {t} = useTranslation()
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
                    {t("share-edit")}
                </Button>
                <Link to={config.routes.managerProduct}>
                    <Button variant="outlined" color="error">
                        {t("share-cancel")}
                    </Button>
                </Link>
            </Grid>
        </div>
    )
}

export default EditProduct