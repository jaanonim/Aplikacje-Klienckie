import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.UUID;

import com.fasterxml.uuid.Generators;
import com.google.gson.Gson;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import spark.Request;
import spark.Response;

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

    public String genOneInvoice(Request req, Response res) {
        String uuid = req.queryParams("uuid");
        for (int i = 0; i < cars.size(); i++) {
            Car currentCar = cars.get(i);
            if (currentCar.getUuid().toString().equals(uuid)) {
                try {
                    Document document = new Document();
                    String path = "src/main/resources/public/invoices/" + uuid + ".pdf";

                    PdfWriter.getInstance(document, new FileOutputStream(path));

                    document.open();

                    Font font16 = FontFactory.getFont(FontFactory.HELVETICA, 16, BaseColor.BLACK);
                    Font font20 = FontFactory.getFont(FontFactory.HELVETICA, 20, BaseColor.BLACK);
                    Font font24 = FontFactory.getFont(FontFactory.HELVETICA, 24, BaseColor.BLACK);

                    var color = Invoice.Colors.get(currentCar.getColor());

                    Font fontColor = FontFactory.getFont(FontFactory.HELVETICA, 16,
                            color == null ? BaseColor.BLACK : color);

                    Paragraph p = new Paragraph("Fakturka dla: \n" + uuid, font20);
                    document.add(p);

                    Paragraph p1 = new Paragraph("Model: " + currentCar.getModel(), font24);
                    document.add(p1);

                    String airbags = "";
                    var a = currentCar.getAirbags();
                    for (int j = 0; j < a.size(); j++) {
                        airbags += "    " + a.get(j).toNiceString() + "\n";
                    }

                    Paragraph p15 = new Paragraph("Color: " + currentCar.getColor(), fontColor);
                    document.add(p15);

                    Paragraph p2 = new Paragraph(
                            "Year: " + currentCar.getYear() + "\n" +
                                    "Airbags:\n" + airbags +
                                    "Price: " + currentCar.getPrice() + "\n",
                            font16);
                    document.add(p2);
                    try {
                        Image img = Image
                                .getInstance("src/main/resources/public/images/" + currentCar.getModel() + ".png");
                        float scaler = ((document.getPageSize().getWidth() - document.leftMargin()
                                - document.rightMargin() - 0) / img.getWidth()) * 100;

                        img.scalePercent(scaler);
                        document.add(img);

                    } catch (Exception e) {
                        // TODO: handle exception
                    }

                    document.close();

                } catch (Exception e) {
                    System.out.println(e);
                    return "not ok";
                }
                currentCar.setHasInvoice(true);
                return "ok";
            }
        }
        return "not ok";
    }

    public String genAllInvoice(Request req, Response res) {
        Invoice invoice = new Invoice(req.queryParams("seller"), req.queryParams("buyer"),
                "Faktura za wszystkie auta ", cars);
        try {
            invoice.generate();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return invoice.getUuid().toString();
    }

    public String genYearInvoice(Request req, Response res) {
        int year = Integer.parseInt(req.queryParams("year"));

        ArrayList<Car> c = new ArrayList<Car>();
        for (Car car : cars) {
            if (car.getYear() == year) {
                c.add(car);
            }
        }

        Invoice invoice = new Invoice(req.queryParams("seller"), req.queryParams("buyer"),
                "Faktura za auta z roku " + Integer.toString(year), c);
        try {
            invoice.generate();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return invoice.getUuid().toString();;
    }

    public String genPriceInvoice(Request req, Response res) {
        int priceMin, priceMax;
        try {
            priceMin = Integer.parseInt(req.queryParams("priceMin"));
            priceMax = Integer.parseInt(req.queryParams("priceMax"));
        } catch (Exception e) {
            return "not ok";
        }

        ArrayList<Car> c = new ArrayList<Car>();
        for (Car car : cars) {
            if (car.getPrice() >= priceMin && car.getPrice() <= priceMax) {
                c.add(car);
            }
        }

        Invoice invoice = new Invoice(req.queryParams("seller"), req.queryParams("buyer"),
                "Faktura za auta z cena " + Integer.toString(priceMin) + "-" + Integer.toString(priceMax), c);
        try {
            invoice.generate();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return invoice.getUuid().toString();;
    }

    public String getInvoice(Request req, Response res) {
        String uuid = req.queryParams("uuid");
        System.out.println(uuid);
        if (uuid.equals("not ok")) {
            return "Invalid UUID";
        }
        res.type("application/octet-stream");
        res.header("Content-Disposition", "attachment; filename=plik.pdf");
        String path = "src/main/resources/public/invoices/" + uuid + ".pdf";
        try {
            OutputStream outputStream = res.raw().getOutputStream();
            outputStream.write(Files.readAllBytes(Paths.get(path)));
            return "";
        } catch (Exception e) {
            System.out.println(e);
            return "not ok";
        }
    }
}
