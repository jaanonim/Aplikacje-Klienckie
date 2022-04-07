package controlers;

import spark.Request;
import spark.Response;

public interface Controler {
    public String find(Request req, Response res);
    public String findAll(Request req, Response res);
    public String create(Request req, Response res);
    public String update(Request req, Response res);
    public String delete(Request req, Response res);
}
