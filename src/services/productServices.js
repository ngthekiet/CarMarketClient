import request from "~/utils/request";
import token from "~/local/token";

const getAllProducts = async () => {
    return await request.get("/products")
}

const getProduct = async (id) => {
    return await request.get(`/product/${id}`)
}
const getProductsByBrand = async (id) => {
    return await request.get(`/brand/${id}/product`)
}

const addProduct = async (
    name, image, price, type, size, fuel, power, color, description, details, category, brand
) => {
    return await request.post("/auth/product", {
        name, image, price, type, size, fuel, power, color, description, details, category, brand
    }, {headers: token()})
}

const deleteProduct = async (id) => {
    return await request.delete(`/auth/product/${id}`, {headers: token()})
}

const editProduct = async (id, name, image, price, type, size, fuel, power, color, description, details, category, brand) => {
    return await request.put(`/auth/product/${id}`, {
        name,
        image,
        price,
        type,
        size,
        fuel,
        power,
        color,
        description,
        details,
        category,
        brand
    }, {headers: token()})
}

const ProductService = {
    getAllProducts,
    getProduct,
    getProductsByBrand,
    addProduct,
    deleteProduct,
    editProduct
}

export default ProductService