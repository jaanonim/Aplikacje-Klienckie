import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.staticFileLocation;

public class App {
    public static void main(String[] args) {
        port(getHerokuPort());
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

    static int getHerokuPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 3000;
    }
}
