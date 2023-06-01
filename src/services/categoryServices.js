import request from "~/utils/request";
import token from "~/local/token";

const getAllCategories = async () => {
    return await request.get("/pri/categories", {headers: token()})
}

const getCategory = async (id) => {
    return await request.get(`/pri/category/${id}`, {headers: token()})
}

const CategoriesService = {
    getAllCategories,
    getCategory
}

export default CategoriesService