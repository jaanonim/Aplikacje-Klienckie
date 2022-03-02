import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import java.util.ArrayList;

public class Api {

    public ArrayList<Car> cars = new ArrayList<Car>();

    public String add(Request req, Response res) {
        cars.add(new Car(req.queryParams("name"), req.queryParams("doors"),req.queryParams("faulty"), req.queryParams("lang")));
        return cars.toArray()[cars.size()-1].toString();
    }

    public String text(Request res, Response req){
        return cars.toString();
    }

    public String json(Request req, Response res) {
        Gson gson = new Gson();
        return gson.toJson(cars, ArrayList.class );
    }

    public String html(Request req, Response res) {
        String s = "<head><link href=\"main.css\" rel=\"stylesheet\"></head><body><table>";
        for (Car car:cars) {
            s+=car.getHtml();
        }
        return s;
    }
}

