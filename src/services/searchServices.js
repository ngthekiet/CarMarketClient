import request from "~/utils/request";

const search = async (text) => {
    return await request.post("/search", text)
}

const SearchService = {
    search
}

export default SearchService