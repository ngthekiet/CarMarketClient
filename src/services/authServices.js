import request from "../utils/request";
import token from "../local/token";

const login = async (username, password) => {
    try {
        const response = await request.post('/authenticate', {username, password})
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

const register = async (username, password) => {
    try {
        const response = await request.post('/register', {username, password})
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
            const response = await request.post("/checkUsername", {username})
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}

const checkPassword = async (username, password) => {
    try {
        const response = await request.post('/checkPassword', {
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