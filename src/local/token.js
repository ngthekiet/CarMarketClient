export default function token() {
    const token = localStorage.getItem('token')
    if (token != null)
        return {Authorization: 'Bearer ' + token}
    return ""
}