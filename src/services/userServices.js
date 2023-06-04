import request from "~/utils/request";
import token from "~/local/token";

const getUsers = async () => {
    return await request.get("/pri/users", {headers: token()})
}

const getUser = async (id) => {
    return await request.get(`/pri/user/${id}`, {
        headers: token()
    })
}

const updateProfile = async (id, address, birthyear, email, firstname, lastname, phone) => {
    return await request.put(`/pri/user/${id}`, {
        address,
        birthyear,
        email,
        firstname,
        lastname,
        phone
    }, {headers: token()})
}

const changeAvatar = async (avatar, id) => {
    return await request.put(`/pri/avatar/${id}`, {avatar}, {headers: token()})
}

const updateRole = async (id, role) => {
    return await request.put(`/pri/role/${id}`, {role}, {headers: token()})
}

const UserService = {
    getUsers,
    getUser,
    updateProfile,
    changeAvatar,
    updateRole
}

export default UserService