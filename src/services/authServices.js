import request from "~/utils/request";
import token from "~/local/token";

const login = async (username, password) => {
    const response = await request.post('/pub/authenticate', {username, password})
    if (response?.data) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userID', response.data.userID)
        localStorage.setItem('avatar', response.data.avatar)
        localStorage.setItem('role', response.data.role)
    }
    return response
}

const register = async (username, password) => {
    const response = await request.post('/pub/register', {username, password})
    if (response?.data) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userID', response.data.userID)
        localStorage.setItem('avatar', response.data.avatar)
        localStorage.setItem('role', response.data.role)
    }
    return response
}

const logout = () => {
    localStorage.clear()
}

const checkUsername = async (username) => {
    return await request.post("/pub/checkUsername", {username})
}

const checkPassword = async (username, password) => {

    return await request.post('/pub/checkPassword', {
        username,
        password
    })
}

const logged = () => {
    if (token() === "")
        return false
    return true
};

const AuthService = {
    login,
    logged,
    logout,
    checkUsername,
    checkPassword,
    register
}

export default AuthService