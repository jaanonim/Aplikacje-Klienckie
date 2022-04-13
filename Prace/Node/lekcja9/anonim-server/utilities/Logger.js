const logger = require('tracer').colorConsole({
    format: '{{timestamp}} <{{title}}> {{message}}',
    dateformat: 'HH:MM:ss.L',
    preprocess: (data) => {
        data.title = data.title.toUpperCase()
    }
});
module.exports = logger;