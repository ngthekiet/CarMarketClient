import request from "../utils/request";

const getAllProducts = async () => {
    try {
        const response = await request.get("/pub/products")
        if (response?.data) {
            return response
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

const ProductService = {
    getAllProducts
}

export default ProductService