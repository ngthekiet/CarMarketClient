import React from "react";

import Header from "~/components/Layout/DefaultLayout/Header";

function DefaultLayout({children}) {
    return (
        <React.Fragment>
            <Header/>
            {children}
        </React.Fragment>
    )
}

export default DefaultLayout