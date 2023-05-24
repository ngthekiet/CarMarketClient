import request from "~/utils/request";

const getRss = async (link) => {
    return await request.post("/pub/getRss", {link})
}

const NewsService = {
    getRss
}

export default NewsService