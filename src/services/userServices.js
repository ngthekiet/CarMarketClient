import request from "../utils/request";
import token from "../local/token";

const getUser = async (id) => {
    try {
        const response = await request.get(`/pri/user/${id}`, {
            headers: token()
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

const UserService = {
    getUser
}

export default UserService