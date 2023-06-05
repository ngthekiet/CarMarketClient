import request from "~/utils/request";

const getRss = async (link) => {
    return await request.post("/rss", {link})
}

const getPost = async (link) => {
    return await request.post("/post", {link})
}

const NewsService = {
    getRss,
    getPost
}

export default NewsService