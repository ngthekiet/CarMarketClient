import request from "~/utils/request";
import token from "~/local/token";

const addToCart = async (user, product, quantity) => {
    return await request.post("/pri/addToCart", {user, product, quantity}, {headers: token()})
}

const getCart = async (uid) => {
    return await request.get(`/pri/getCart/${uid}`, {headers: token()})
}

const removeFromCart = async (id) => {
    return await request.delete(`/pri/removeFromCart/${id}`, {headers: token()})
}

const updateCart = async (cartID, quantity) => {
    return await request.put("/pri/updateCart", {cartID, quantity}, {headers: token()})
}

const repurchase = async (oid) => {
    return await request.post("/pri/repurchase", {oid}, {headers: token()})
}

const CartService = {
    addToCart,
    getCart,
    removeFromCart,
    updateCart,
    repurchase
}

export default CartService