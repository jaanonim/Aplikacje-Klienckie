import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.PdfWriter;

import spark.Request;
import spark.Response;

import java.io.FileOutputStream;
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
                copy.setHasInvoice(false);
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
        String uuid = req.queryParams("uuid");
        for (int i = 0; i < cars.size(); i++) {
            if (cars.get(i).getUuid().toString().equals(uuid)) {
                try {
                    Document document = new Document();
                    String path = "invoices/" + uuid + ".pdf";
                    PdfWriter.getInstance(document, new FileOutputStream(path));

                    document.open();
                    Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
                    Chunk chunk = new Chunk("Fakturka dla " + uuid, font);

                    document.add(chunk);
                    document.close();

                } catch (Exception e) {
                    System.out.println(e);
                    return "not ok";
                }
                cars.get(i).setHasInvoice(true);
                return "ok";
            }
        }
        return "not ok";
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
