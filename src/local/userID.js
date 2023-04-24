export default function userID() {
    const userID = localStorage.getItem('userID')
    if (userID != null)
        return userID
    return ""
}