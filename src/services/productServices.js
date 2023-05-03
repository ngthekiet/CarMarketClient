import request from "../utils/request";

const getAllProducts = async () => {
    try {
        const response = await request.get("/pub/products")
        if (response?.data)
            return response
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async (id) => {
    try {
        const response = await request.get(`/pub/product/${id}`)
        if (response?.data)
            return response
    } catch (error) {
        console.log(error)
    }
}

const ProductService = {
    getAllProducts,
    getProduct
}

export default ProductService