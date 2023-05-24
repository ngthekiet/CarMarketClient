import request from "~/utils/request";

const getAllBrands = async () => {
    return await request.get("/pub/brands")
}

const BrandService = {
    getAllBrands
}

export default BrandService