import React from "react";
import Paperbase from "~/components/Layout/DashboardLayout/Paperbase/Paperbase";

function DashboardLayout({children}) {
    return (
        <React.Fragment>
            <Paperbase children={children}/>
        </React.Fragment>
    )
}

export default DashboardLayout