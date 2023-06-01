export default function role() {
    const role = localStorage.getItem('role')
    if (role != null)
        return role
    return ""
}