import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        port(3000);
        staticFileLocation("public");
        Api api = new Api();
        post("/add", (req, res) -> api.add(req, res));
        get("/get", (req, res) -> api.get(req, res));
        delete("/delete", (req, res) -> api.delete(req, res));
        post("/update", (req, res) -> api.update(req, res));
        put("/generate", (req, res) -> api.generate(req, res));
        put("/invoice/generate", (req, res) -> api.genInvoice(req, res));
        get("/invoice", (req, res) -> api.getInvoice(req, res));
    }

}