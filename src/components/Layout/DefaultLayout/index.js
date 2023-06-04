import React from "react";

import Header from "~/components/Layout/DefaultLayout/Header";
import Footer from "~/components/Layout/DefaultLayout/Footer";

function DefaultLayout({children}) {
    return (
        <React.Fragment>
            <Header/>
            {children}
            <Footer/>
        </React.Fragment>
    )
}

export default DefaultLayout