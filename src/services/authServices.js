import request from "../utils/request";
import token from "../local/token";

const login = async (username, password) => {
    try {
        const response = await request.post('/authenticate', {username, password});
        if (response?.data) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
        }
        return response
    } catch (error) {
        return error.response.status
    }
}

const logged = () => {
    if (token() === "")
        return false
    return true
};

const AuthService = {
    login,
    logged
}

export default AuthService