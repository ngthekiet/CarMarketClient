import request from "~/utils/request";
import token from "~/local/token";

const getAllCategories = async () => {
    return await request.get("/pri/categories", {headers: token()})
}

const getCategory = async (id) => {
    return await request.get(`/pri/category/${id}`, {headers: token()})
}

const newCategory = async (name) => {
    return await request.post("/pri/category", {name}, {headers: token()})
}

const CategoriesService = {
    getAllCategories,
    getCategory,
    newCategory
}

export default CategoriesService