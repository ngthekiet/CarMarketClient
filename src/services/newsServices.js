import request from "~/utils/request";

const getRss = async (link) => {
    return await request.post("/pub/getRss", {link})
}

const getPost = async (link) => {
    return await request.post("/pub/getPost", {link})
}

const NewsService = {
    getRss,
    getPost
}

export default NewsService