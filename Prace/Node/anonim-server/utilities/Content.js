const contentTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    jpg: "image/jpeg",
    png: "image/png",
    ico: "image/x-icon"
};

module.exports = getContentType = (fileName) => {
    let extention = fileName.split(".");
    extention = extention[extention.length - 1];

    const content = contentTypes[extention] ? contentTypes[extention] : "text/plain";
    return content
}