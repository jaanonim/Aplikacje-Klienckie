const Server = require("./anonim-server");
const ControlerFactory = require("./anonim-server/classes/Controler/");
const ModelFactory = require("./anonim-server/classes/Model");
const MongoDb = require("./anonim-server/classes/Model/MongoDb");
const RouterFactory = require("./anonim-server/classes/Router");

const Task = new ModelFactory("task").create({}, MongoDb);

const TaskControler = new ControlerFactory("task", Task).create({});

const router = RouterFactory.create(TaskControler);

const app = new Server();

app.setConfig("jsonParser", true);

app.root.route("/api", router);

app.listen();
