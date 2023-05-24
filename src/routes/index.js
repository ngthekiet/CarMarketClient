import config from "~/config";

import Home from "~/pages/Home";
import Account from "~/pages/Account";
import Notfound from "~/pages/Notfound";
import ProductDetail from "~/pages/ProductDetail";
import Profile from "~/pages/Profile";
import Cart from "~/pages/Cart";
import Dashboard from "~/pages/Dashboard";
import Confirm from "~/pages/Confirm";
import MyOrder from "~/pages/MyOrder";
import OrderDetail from "~/pages/OrderDetail";
import News from "~/pages/News";
import Post from "~/pages/Post";


const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.account, component: Account},
    {path: config.routes.notfound, component: Notfound},
    {path: config.routes.detail, component: ProductDetail},
    {path: config.routes.profile, component: Profile},
    {path: config.routes.cart, component: Cart},
    {path: config.routes.confirm, component: Confirm},
    {path: config.routes.cartNull, component: Account},
    {path: config.routes.profileNull, component: Account},
    {path: config.routes.myOrder, component: MyOrder},
    {path: config.routes.orderDetail, component: OrderDetail},
    {path: config.routes.news, component: News},
    {path: config.routes.post, component: Post},
    {path: config.routes.dashboard, component: Dashboard, layout: "dashboard"}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}