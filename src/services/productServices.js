import request from "~/utils/request";

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
const getProductsByBrand = async (cid) => {
    return await request.get(`/pub/productBrand/${cid}`)
}

const ProductService = {
    getAllProducts,
    getProduct,
    getProductsByBrand
}

export default ProductService