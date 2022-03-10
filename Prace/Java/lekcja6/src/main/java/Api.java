import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

import java.util.ArrayList;
import java.util.UUID;

public class Api {
    private ArrayList<Car> cars = new ArrayList<Car>();

    public String add(Request req, Response res) {
        UUID uuid = Generators.randomBasedGenerator().generate();
        Car obj = new Gson().fromJson(req.body(), Car.class);
        obj.setUuid(uuid);
        cars.add(obj);
        return obj.toString();
    }

    public String get(Request req, Response res){
        return cars.toString();
    }

    public String update(Request req,Response res){
        String uuid = req.queryParams("uuid");
        Car obj = new Gson().fromJson(req.body(), Car.class);
        cars.replaceAll((Car c)->{
            if(c.getUuid().toString().equals(uuid))
            {
                Car copy = c.copy();
                copy.setModel(obj.getModel());
                copy.setYear(obj.getYear());
                return copy;
            }
            else
            {
                return c;
            }
        });
        return "ok";
    }

    public String delete(Request req,Response res){
        String uuid = req.queryParams("uuid");
        cars.removeIf((Car c)-> c.getUuid().toString().equals(uuid) );
        return "ok";
    }

}
