const ControlerFactory = require("./anonim-server/classes/Controler/Factory");
const ModelFactory = require("./anonim-server/classes/Model/Factory");
const Memory = require("./anonim-server/classes/Model/Models/Memory");

const Task = new ModelFactory("task").create({}, Memory);
const controller = new ControlerFactory("task", Task).create({});
console.log(
    controller.create({
        getBody() {
            return { aa: 1 };
        },
        sendJson(v) {
            console.log(v);
        },
    })
);
