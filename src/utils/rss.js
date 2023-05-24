const getData = (text) => {
    return text.replace(text.slice(text.indexOf(" href"), text.indexOf("><img")), "")
        .replace("<a>", "")
        .replace("</a>", "")
}
const getImage = (text) => {
    return getData(text).replace(text.slice(text.indexOf("</a>") + 5, text.size), "")
}

const getDescription = (text) => {
    let result = getData(text)
    result = result.replace(result.slice(result.indexOf("img"), result.indexOf('">')), result.size)
        .replace(result.slice(result.indexOf("<undef"), result.indexOf('">') + 3), "")
    return result.replace(result.slice(result.indexOf("<undef"), result.indexOf('">') + 3), "")
}

const getLink = (text) => {
    return text.replace(process.env.REACT_APP_URL_THANHNIEN, "")
}

const getPost = (text) => {
    let result = text.replace(text.slice(text.indexOf('<div class="detail-top">'), text.indexOf('<h1 class="detail-title">')), "")
    result = result.replace(result.slice(result.indexOf('<div class="detail-author"'), result.indexOf('<div class="detail-time">')), "")
    result = result.replace(result.slice(result.indexOf('<div class="social-top">'), result.indexOf('<h2 class="detail-sapo"')), "")
    result = result.replace(result.slice(result.indexOf('<div class="detail__related"'), result.indexOf('<div class="detail__cmain-sub">')), "")
    result = result.replace(result.slice(result.indexOf('<div class="social-top">'), result.indexOf('<div class="detail__cmain-sub">')), "")
    result = result.replaceAll("href", "link")
    return result
}

const GlobalService = {
    getData,
    getImage,
    getDescription,
    getLink,
    getPost
}

export default GlobalService