import Home from "../pages/Home";
import Account from "../pages/Account";


const publicRoutes = [
    {path: '/', component: Home},
    {path: '/account', component: Account},
]

const privateRoutes = []

export {publicRoutes, privateRoutes}