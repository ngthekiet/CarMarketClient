import request from "~/utils/request";
import token from "~/local/token";

const addToCart = async (user, product, quantity) => {
    return await request.post("/auth/add-to-cart", {user, product, quantity}, {headers: token()})
}

const getCart = async (id) => {
    return await request.get(`/auth/cart/${id}`, {headers: token()})
}

const removeFromCart = async (id) => {
    return await request.delete(`/auth/remove-from-cart/${id}`, {headers: token()})
}

const updateCart = async (cartID, quantity) => {
    return await request.put("/auth/cart", {cartID, quantity}, {headers: token()})
}

const repurchase = async (id) => {
    return await request.post("/auth/repurchase", {id}, {headers: token()})
}

const CartService = {
    addToCart,
    getCart,
    removeFromCart,
    updateCart,
    repurchase
}

export default CartService