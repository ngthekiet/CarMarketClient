import React from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import styles from "~/pages/MyOrder/UserInfo/UserInfo.module.scss"

function UserInfo({data}) {
    const {t} = useTranslation()
    return (
        <React.Fragment>
            <div className={clsx(styles.container)}>
                <span>
                <b>{t("share-boughtby")}: </b><u><Link
                    to={`/profile/${data.id}`}>{data.firstname} {data.lastname}</Link></u>
            </span>
                <span>
                <b>Email: </b>{data.email}
            </span>
                <span>
                <b>{t("share-address")}: </b>{data.address}
            </span>
                <span>
                <b>{t("share-phone")}: </b>{data.phone}
            </span>
            </div>
        </React.Fragment>
    )
}

export default UserInfo