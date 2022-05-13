const parseBody = require("./BodyParser");
const formidable = require("formidable");

const processBody = (req, res, config, options) => {
    return new Promise((resolve, reject) => {
        if (options.fileUpload === true) {
            const form = formidable(config.formidable);

            form.parse(req, (err, fields, files) => {
                if (err) throw err;
                req.body = fields;
                req.files = files;
                resolve({ req, res });
            });
        } else {
            let body = "";
            req.on("data", (data) => {
                body += data.toString();
            });

            req.on("end", async () => {
                req.body = parseBody(body, config);
                resolve({ req, res });
            });
        }
    });
};

module.exports = processBody;
