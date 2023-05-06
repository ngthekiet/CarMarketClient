import request from "~/utils/request";
import token from "~/local/token";

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
    try {
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
    } catch (error) {
        console.log(error)
    }
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

const UserService = {
    getUser,
    updateProfile,
    changeAvatar
}

export default UserService