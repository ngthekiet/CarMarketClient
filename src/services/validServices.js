import request from "~/utils/request";

const validUsername = async (username) => {
    return await request.post("/valid/username", {username})
}

const validPassword = async (password) => {
    return await request.post("/valid/password", {password})
}

const validEmail = async (email) => {
    return await request.post("/valid/email", {email})
}

const ValidService = {
    validUsername,
    validPassword,
    validEmail
}

export default ValidService