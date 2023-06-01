import request from "~/utils/request";
import token from "~/local/token";

const login = async (username, password) => {
    try {
        const response = await request.post('/pub/authenticate', {username, password})
        if (response?.data) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
            localStorage.setItem('avatar', response.data.avatar)
            localStorage.setItem('role', response.data.role)
        }
        return response
    } catch (error) {
        return error.response.status
    }
}

const register = async (username, password) => {
    try {
        const response = await request.post('/pub/register', {username, password})
        if (response?.data) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
            localStorage.setItem('avatar', response.data.avatar)
        }
        return response
    } catch (error) {
        return error.response.status
    }
}

const logout = () => {
    localStorage.clear()
}

const checkUsername = async (username) => {
    try {
        if (username !== "") {
            const response = await request.post("/pub/checkUsername", {username})
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}

const checkPassword = async (username, password) => {
    try {
        const response = await request.post('/pub/checkPassword', {
            username,
            password
        })
        return response
    } catch (error) {
        console.log(error)
    }
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