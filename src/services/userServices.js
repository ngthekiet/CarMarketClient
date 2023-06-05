import request from "~/utils/request";
import token from "~/local/token";

const getUsers = async () => {
    return await request.get("/auth/users", {headers: token()})
}

const getUser = async (id) => {
    return await request.get(`/auth/user/${id}`, {
        headers: token()
    })
}

const updateProfile = async (id, address, birthyear, email, firstname, lastname, phone) => {
    return await request.put(`/auth/user/${id}`, {
        address,
        birthyear,
        email,
        firstname,
        lastname,
        phone
    }, {headers: token()})
}

const changeAvatar = async (avatar, id) => {
    return await request.put(`/auth/user/${id}/avatar`, {avatar}, {headers: token()})
}

const updateRole = async (id, role) => {
    return await request.put(`/auth/user/${id}/role`, {role}, {headers: token()})
}

const UserService = {
    getUsers,
    getUser,
    updateProfile,
    changeAvatar,
    updateRole
}

export default UserService