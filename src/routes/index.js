import config from "~/config";

import Home from "~/pages/Home";
import Account from "~/pages/Account";
import Notfound from "~/pages/Notfound";
import ProductDetail from "~/pages/ProductDetail";
import Profile from "~/pages/Profile";
import Cart from "~/pages/Cart";
import Confirm from "~/pages/Confirm";
import MyOrder from "~/pages/MyOrder";
import OrderDetail from "~/pages/OrderDetail";
import News from "~/pages/News";
import Post from "~/pages/Post";
import ManagerUser from "~/pages/Dashboard/ManagerUser/ManagerUser";
import ManagerProduct from "~/pages/Dashboard/ManagerProduct/ManagerProduct";
import AddProduct from "~/pages/Dashboard/ManagerProduct/AddProduct";
import EditProduct from "~/pages/Dashboard/ManagerProduct/EditProduct";


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
]

const privateRoutes = [
    {path: config.routes.dashboard, component: ManagerUser, layout: "dashboard"},
    {path: config.routes.managerUser, component: ManagerUser, layout: "dashboard"},
    {path: config.routes.managerProduct, component: ManagerProduct, layout: "dashboard"},
    {path: config.routes.addProduct, component: AddProduct, layout: "dashboard"},
    {path: config.routes.editProduct, component: EditProduct, layout: "dashboard"}
]

export {publicRoutes, privateRoutes}