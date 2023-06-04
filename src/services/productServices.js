import request from "~/utils/request";
import token from "~/local/token";

const getAllProducts = async () => {
    return await request.get("/pub/products")
}

const getProduct = async (id) => {
    return await request.get(`/pub/product/${id}`)
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

const editProduct = async (id, name, image, price, type, size, fuel, power, color, description, details, category, brand) => {
    return await request.put(`/pri/product/${id}`, {
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