import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        port(80);
        staticFileLocation("public");
        Api api = new Api();
        post("/add",(req,res) -> api.add(req,res));
        get("/get",(req,res) -> api.get(req,res));
        delete("/delete",(req,res)->api.delete(req,res));
        post("/update",(req,res)->api.update(req,res));

    }

}