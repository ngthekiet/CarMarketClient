import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import clsx from "clsx";

import styles from "~/pages/MyOrder/Action/Action.module.scss"

function Action({oid}) {

    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <Link to={`/order/detail/${oid}`}>
                    <Button variant="outlined">Detail</Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Action