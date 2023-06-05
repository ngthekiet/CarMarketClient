import request from "~/utils/request";
import token from "~/local/token";

const getAllCategories = async () => {
    return await request.get("/auth/categories", {headers: token()})
}

const getCategory = async (id) => {
    return await request.get(`/auth/category/${id}`, {headers: token()})
}

const newCategory = async (name) => {
    return await request.post("/auth/category", {name}, {headers: token()})
}

const CategoriesService = {
    getAllCategories,
    getCategory,
    newCategory
}

export default CategoriesService