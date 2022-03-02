import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        port(80);
        staticFileLocation("public");
        Api api = new Api();
        get("/add",(req,res) -> api.add(req,res));
        get("/text",(req,res) -> api.text(req,res));
        get("/json",(req,res) -> api.json(req,res));
        get("/html",(req,res) -> api.html(req,res));

    }

}

