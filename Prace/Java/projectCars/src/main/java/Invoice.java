import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import com.fasterxml.uuid.Generators;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class Invoice {
    public String title;
    public String seller;
    public String buyer;
    public String type;
    public UUID uuid;
    public ArrayList<Car> cars;
    public static int nr;

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public ArrayList<Car> getCars() {
        return cars;
    }

    public void setCars(ArrayList<Car> cars) {
        this.cars = cars;
    }

    public Invoice(String seller, String buyer, String type, ArrayList<Car> cars) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        Invoice.nr++;
        UUID uuid = Generators.randomBasedGenerator().generate();
        this.uuid = uuid;
        this.title = "VAT/" + sdf.format(new Date()) + "/" + Invoice.nr;
        this.seller = seller;
        this.buyer = buyer;
        this.cars = cars;
        this.type = type;
    }

    public void generate() throws FileNotFoundException, DocumentException {
        Document document = new Document();
        String path = "src/main/resources/public/invoices/" + this.uuid + ".pdf";
        PdfWriter.getInstance(document, new FileOutputStream(path));

        Font font14 = FontFactory.getFont(FontFactory.HELVETICA, 14, BaseColor.BLACK);
        Font font14b = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);
        Font font20 = FontFactory.getFont(FontFactory.HELVETICA, 20, BaseColor.BLACK);
        Font font20red = FontFactory.getFont(FontFactory.HELVETICA, 20, BaseColor.RED);
        Font font24 = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.BLACK);

        document.open();
        Paragraph p = new Paragraph("FAKTURA: " + title, font24);
        document.add(p);

        p = new Paragraph("Kupujący: " + buyer + "\nSprzedjący: " + seller, font20);
        document.add(p);

        p = new Paragraph(type + "\n    ", font20red);
        document.add(p);

        PdfPTable table = new PdfPTable(6);

        PdfPCell c = new PdfPCell(new Phrase("lp", font14b));
        table.addCell(c);
        c = new PdfPCell(new Phrase("model", font14b));
        table.addCell(c);
        c = new PdfPCell(new Phrase("year", font14b));
        table.addCell(c);
        c = new PdfPCell(new Phrase("cena", font14b));
        table.addCell(c);
        c = new PdfPCell(new Phrase("tax", font14b));
        table.addCell(c);
        c = new PdfPCell(new Phrase("value", font14b));
        table.addCell(c);

        int i = 0;
        float total = 0;
        for (Car car : cars) {
            float price = car.getPrice();
            float tax = car.getTax();
            float value = price * (tax / 100f + 1f);

            i++;
            c = new PdfPCell(new Phrase(Integer.toString(i), font14));
            table.addCell(c);
            c = new PdfPCell(new Phrase(car.getModel(), font14));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Integer.toString(car.getYear()), font14));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(price), font14));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(tax) + "%", font14));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(value), font14));
            table.addCell(c);
            total += value;
        }

        document.add(table);

        p = new Paragraph("Total: " + total + "zl", font20);
        document.add(p);

        document.close();
    }

    public static HashMap<String, BaseColor> Colors = new HashMap<>() {
        {
            put("red", BaseColor.RED);
            put("blue", BaseColor.BLUE);
            put("green", BaseColor.GREEN);
            put("yellow", BaseColor.YELLOW);
            put("black", BaseColor.BLACK);
            put("white", BaseColor.WHITE);
        }
    };

    public UUID getUuid() {
        return uuid;
    }
}
