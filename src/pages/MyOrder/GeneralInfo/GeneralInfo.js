import React from "react";
import Moment from 'moment';

function GeneralInfo({data}) {
    return (
        <React.Fragment>
            <div>
                <b>Order date: </b>{Moment(data.createDate).format('DD/MM/yyyy HH:mm:ss')}
            </div>
            <div>
                <b>Status: </b>{data.status}
            </div>
        </React.Fragment>
    )
}

export default GeneralInfo