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
    return text.replace("https://thanhnien.vn/", "")
}

const GlobalService = {
    getData,
    getImage,
    getDescription,
    getLink
}

export default GlobalService