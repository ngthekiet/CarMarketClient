import request from "~/utils/request";

const getAllBrands = async () => {
    return await request.get("/pub/brands")
}

const getBrand = async (id) => {
    return await request.get(`/pub/brand/${id}`)
}

const BrandService = {
    getAllBrands,
    getBrand
}

export default BrandService