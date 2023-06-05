import request from "~/utils/request";
import token from "~/local/token";

const getAllOrder = async () => {
    return await request.get("/auth/orders", {headers: token()})
}

const order = async (id) => {
    return await request.post(`/auth/order`, {id}, {headers: token()})
}

const myOrder = async (id) => {
    return await request.get(`/auth/order/${id}`, {headers: token()})
}

const orderDetail = async (id) => {
    return await request.get(`/auth/order/${id}/detail`, {headers: token()})
}

const cancelOrder = async (id) => {
    return await request.put("/auth/cancel-order", {id}, {headers: token()})
}

const getOrder = async (id) => {
    return await request.get(`/auth/user/${id}/orders`, {headers: token()})
}

const updateStatus = async (id, status) => {
    return await request.put(`/auth/order/${id}/status`, {status}, {headers: token()})
}

const OrderService = {
    getAllOrder,
    order,
    myOrder,
    orderDetail,
    cancelOrder,
    getOrder,
    updateStatus
}

export default OrderService