package controlers;

import models.User;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;

import history.History;

public class UserControler implements Controler {

    @Override
    public String find(Request req, Response res) {
        String id = req.params(":id");
        User u = User.store.get(id);
        if (u == null) {
            res.status(404);
            String v = "{\"message\": \"User not found\"}";
            History.log(req, res, v);
            return v;
        }
        String v = u.toString();
        History.log(req, res, v);
        return v;

    }

    @Override
    public String findAll(Request req, Response res) {
        Gson gson = new Gson();
        String v = gson.toJson(User.store);
        History.log(req, res, v);
        return v;
    }

    @Override
    public String create(Request req, Response res) {
        Gson gson = new Gson();
        User user = gson.fromJson(req.body(), User.class);
        User.push(user);
        res.status(201);
        String v = user.toString();
        History.log(req, res, v);
        return v;
    }

    @Override
    public String update(Request req, Response res) {
        String id = req.params(":id");
        User u = User.store.get(id);
        if (u == null) {
            res.status(404);
            String v = "{\"message\": \"User not found\"}";
            History.log(req, res, v);
            return v;
        }

        Gson gson = new Gson();
        User newUser = gson.fromJson(req.body(), User.class);

        if (newUser == null) {
            res.status(400);
            String v = "{\"message\": \"No data\"}";
            History.log(req, res, v);
            return v;
        }

        if (newUser.getEmail() != null) {
            u.setEmail(newUser.getEmail());
        }
        if (newUser.getFirstName() != null) {
            u.setFirstName(newUser.getFirstName());
        }
        if (newUser.getLastName() != null) {
            u.setLastName(newUser.getLastName());
        }

        String v = u.toString();
        History.log(req, res, v);
        return v;
    }

    @Override
    public String delete(Request req, Response res) {
        String id = req.params(":id");
        User u = User.store.get(id);
        if (u == null) {
            res.status(404);
            String v = "{\"message\": \"User not found\"}";
            History.log(req, res, v);
            return v;
        }
        User.store.remove(id);
        res.status(204);
        String v = u.toString();
        History.log(req, res, v);
        return v;
    }

}
