import React from "react";
import Moment from 'moment';
import {useTranslation} from "react-i18next";

function GeneralInfo({data}) {
    const {t} = useTranslation()
    return (
        <React.Fragment>
            <div>
                <b>{t("share-purchasedate")}: </b>{Moment(data.createDate).format('DD/MM/yyyy HH:mm:ss')}
            </div>
            <div>
                <b>{t("share-status")}: </b>{data.status}
            </div>
        </React.Fragment>
    )
}

export default GeneralInfo