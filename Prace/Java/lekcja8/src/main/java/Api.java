import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import com.itextpdf.text.DocumentException;
import spark.Request;
import spark.Response;

import java.io.FileNotFoundException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
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

    public String get(Request req, Response res) {
        return cars.toString();
    }

    public String update(Request req, Response res) {
        String uuid = req.queryParams("uuid");
        Car obj = new Gson().fromJson(req.body(), Car.class);
        cars.replaceAll((Car c) -> {
            if (c.getUuid().toString().equals(uuid)) {
                Car copy = c.copy();
                copy.setModel(obj.getModel());
                copy.setYear(obj.getYear());
                return copy;
            } else {
                return c;
            }
        });
        return "ok";
    }

    public String delete(Request req, Response res) {
        String uuid = req.queryParams("uuid");
        cars.removeIf((Car c) -> c.getUuid().toString().equals(uuid));
        return "ok";
    }

    public String generate(Request req, Response res) {
        for (int i = 0; i < 10; i++) {
            cars.add(Car.randomCar());
        }
        return "ok";
    }

    public String genInvoice(Request req, Response res) {
        int year = Integer.parseInt(req.queryParams("year"));

        ArrayList<Car> c = new ArrayList<Car>();
        for (Car car : cars) {
            if (car.getYear() == year) {
                c.add(car);
            }
        }

        Invoice invoice = new Invoice(req.queryParams("title"), req.queryParams("seller"), req.queryParams("buyer"), c);
        try {
            invoice.generate();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return "ok lol";
    }

    public String getInvoice(Request req, Response res) {
        String uuid = req.queryParams("uuid");
        res.type("application/octet-stream"); //
        res.header("Content-Disposition", "attachment; filename=plik.pdf"); // nagłówek
        try {
            OutputStream outputStream = res.raw().getOutputStream();
            outputStream.write(Files.readAllBytes(Paths.get("invoices/" + uuid + ".pdf")));
            return "";
        } catch (Exception e) {
            System.out.println(e);
            return "not ok";
        }
    }
}
