import request from "~/utils/request";
import token from "~/local/token";

const order = async (uid) => {
    return await request.post(`/pri/order`, {uid}, {headers: token()})
}

const OrderService = {
    order
}

export default OrderService