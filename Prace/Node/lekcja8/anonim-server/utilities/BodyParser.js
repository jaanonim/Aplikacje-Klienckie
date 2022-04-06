module.exports = parseBody = (body, config) => {
    if (config.jsonParser) {
        try {
            return JSON.parse(body);
        }
        catch (error) {
            return body;
        }
    } return body;
}