import request from "~/utils/request";
import token from "~/local/token";

const addToCart = async (user, product, quantity) => {
    const response = await request.post("/pri/addToCart", {user, product, quantity}, {headers: token()})
    return response
}

const getCart = async (uid) => {
    try {
        const response = await request.get(`/pri/getCart/${uid}`, {headers: token()})
        return response
    } catch (error) {
        console.log(error)
    }
}

const removeFromCart = async (id) => {
    try {
        const response = await request.delete(`/pri/removeFromCart/${id}`, {headers: token()})
        return response
    } catch (error) {
        console.log(error)
    }
}

const updateCart = async (cartID, quantity) => {
    try {
        const response = await request.put("/pri/updateCart", {cartID, quantity}, {headers: token()})
        return response
    } catch (error) {
        console.log(error)
    }
}

const CartService = {
    addToCart,
    getCart,
    removeFromCart,
    updateCart
}

export default CartService