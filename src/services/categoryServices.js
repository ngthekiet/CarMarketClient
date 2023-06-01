import request from "~/utils/request";
import token from "~/local/token";

const getAllCategories = async () => {
    return await request.get("/pri/categories", {headers: token()})
}

const CategoriesService = {
    getAllCategories
}

export default CategoriesService