import request from "~/utils/request";
import token from "~/local/token";

const getAllBrands = async () => {
    return await request.get("/brands")
}

const getBrand = async (id) => {
    return await request.get(`/brand/${id}`)
}

const newBrand = async (name, logo) => {
    return await request.post("/auth/brand", {name, logo}, {headers: token()})
}

const BrandService = {
    getAllBrands,
    getBrand,
    newBrand
}

export default BrandService