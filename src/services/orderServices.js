import request from "~/utils/request";
import token from "~/local/token";

const order = async (uid) => {
    return await request.post(`/pri/order`, {uid}, {headers: token()})
}

const myOrder = async (uid) => {
    return await request.get(`/pri/order/${uid}`, {headers: token()})
}

const orderDetail = async (id) => {
    return await request.get(`/pri/orderDetail/${id}`, {headers: token()})
}

const cancelOrder = async (oid) => {
    return await request.put("/pri/cancelOrder", {oid}, {headers: token()})
}

const getOrder = async (oid) => {
    return await request.get(`/pri/orderBy/${oid}`, {headers: token()})
}

const OrderService = {
    order,
    myOrder,
    orderDetail,
    cancelOrder,
    getOrder
}

export default OrderService