import "~/App.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import "~/i18n/i18n"
import {publicRoutes} from "~/routes";
import {DefaultLayout, DashboardLayout} from "~/components/Layout";
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout
                        if (route.layout === "dashboard")
                            Layout = DashboardLayout
                        else
                            Layout = DefaultLayout
                        const Page = route.component
                        return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
                    })}
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    )
}

export default App;
