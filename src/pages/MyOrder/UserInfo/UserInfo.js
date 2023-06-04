import React from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";

import styles from "~/pages/MyOrder/UserInfo/UserInfo.module.scss"

function UserInfo({data}) {
    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <span>
                <b>Order by: </b><u><Link to={`/profile/${data.id}`}>{data.firstname} {data.lastname}</Link></u>
            </span>
                <span>
                <b>Email: </b>{data.email}
            </span>
                <span>
                <b>Address: </b>{data.address}
            </span>
                <span>
                <b>Phone: </b>{data.phone}
            </span>
            </div>
        </React.Fragment>
    )
}

export default UserInfo