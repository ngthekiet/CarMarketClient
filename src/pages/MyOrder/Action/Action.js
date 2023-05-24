import React, {useEffect, useState} from "react";
import clsx from "clsx";

import styles from "~/pages/MyOrder/Action/Action.module.scss"
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function Action({oid}) {

    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <Link to={`/order/detail/${oid}`}>
                    <Button variant="contained">Detail</Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Action