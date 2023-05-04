import request from "../utils/request";

const search = async (text) => {
    try {
        const response = await request.post("/pub/search", text)
        return response
    } catch (error) {
        console.log(error)
    }
}

const SearchService = {
    search
}

export default SearchService