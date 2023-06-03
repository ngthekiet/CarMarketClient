import "~/App.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import "~/i18n/i18n"
import {publicRoutes, privateRoutes} from "~/routes";
import {DefaultLayout, DashboardLayout} from "~/components/Layout";
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState, createContext} from "react";
import role from "~/local/role";

export const UserRole = createContext()

function App() {
    const userRole = role()
    const [admin, setAdmin] = useState(true)
    const [roleChange, setRoleChange] = useState(false)

    useEffect(() => {
        setRoleChange(false)
        if (userRole === "ADMIN" || userRole === "MANAGER") {
            setAdmin(true)
            return
        }
        setAdmin(false)
    }, [roleChange])

    const handleChangeRole = (value) => {
        setRoleChange(value)
    }
    return (
        <UserRole.Provider value={handleChangeRole}>
            <Router>
                <div className="App">
                    <Routes>
                        {
                            admin
                            &&
                            privateRoutes.map((route, index) => {
                                let Layout
                                if (route.layout === "dashboard")
                                    Layout = DashboardLayout
                                else
                                    Layout = DefaultLayout
                                const Page = route.component
                                return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
                            })
                        }
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
        </UserRole.Provider>
    )
}

export default App;
