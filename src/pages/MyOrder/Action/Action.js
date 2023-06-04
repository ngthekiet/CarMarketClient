import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import styles from "~/pages/MyOrder/Action/Action.module.scss"

function Action({oid}) {
    const {t} = useTranslation()

    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <Link to={`/order/detail/${oid}`}>
                    <Button variant="outlined">{t("share-detail")}</Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Action