import static spark.Spark.*;

import controlers.UserControler;

public class App {
    public static void main(String[] args) {
        port(3000);

        UserControler user = new UserControler();

        get("/api/users", (req, res) -> user.findAll(req, res));
        get("/api/users/:id", (req, res) -> user.find(req, res));
        post("/api/users", (req, res) -> user.create(req, res));
        patch("/api/users/:id", (req, res) -> user.update(req, res));
        delete("/api/users/:id", (req, res) -> user.delete(req, res));
    }

}