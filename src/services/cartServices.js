import request from "~/utils/request";
import token from "~/local/token";

const addToCart = async (user, product, quantity) => {
    try {
        const response = await request.post("/pri/addToCart", {user, product, quantity}, {headers: token()})
        return response
    } catch (error) {
        console.log(error)
    }
}

const getCart = async (uid) => {
    try {
        const response = await request.get(`/pri/getCart/${uid}`, {headers: token()})
        return response
    } catch (error) {
        console.log(error)
    }
}

const CartService = {
    addToCart,
    getCart
}

export default CartService