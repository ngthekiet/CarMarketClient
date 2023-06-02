import request from "~/utils/request";
import token from "~/local/token";

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

const addProduct = async (
    name, image, price, type, size, fuel, power, color, description, details, category, brand
) => {
    return await request.post("/pri/product", {
        name, image, price, type, size, fuel, power, color, description, details, category, brand
    }, {headers: token()})
}

const deleteProduct = async (id) => {
    return await request.delete(`/pri/product/${id}`, {headers: token()})
}

const ProductService = {
    getAllProducts,
    getProduct,
    getProductsByBrand,
    addProduct,
    deleteProduct
}

export default ProductService