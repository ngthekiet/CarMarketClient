import request from "~/utils/request";
import token from "~/local/token";

const getUsers = async () => {
    return await request.get("/pri/users", {headers: token()})
}

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

const updateProfile = async (id, address, birthyear, email, firstname, lastname, phone) => {
    const response = await request.put(`/pri/user/${id}`, {
        address,
        birthyear,
        email,
        firstname,
        lastname,
        phone
    }, {
        headers: token()
    })
    return response
}

const changeAvatar = async (avatar, id) => {
    try {
        const response = await request.put(`/pri/avatar/${id}`, {
            avatar
        }, {
            headers: token()
        })
        return response
    } catch (error) {
        console.log(error)
    }
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