import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;

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
    public ArrayList<Car> cars;

    public String getTitle() {
        return title;
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

    public Invoice(String title, String seller, String buyer, ArrayList<Car> cars) {
        this.title = title;
        this.seller = seller;
        this.buyer = buyer;
        this.cars = cars;
    }

    public void generate() throws FileNotFoundException, DocumentException {
        Document document = new Document();
        String path = "invoices/randomInvoice.pdf";
        PdfWriter.getInstance(document, new FileOutputStream(path));
        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);

        document.open();
        Paragraph p = new Paragraph("FAKTURA " + title, font);
        document.add(p);

        PdfPTable table = new PdfPTable(5);

        PdfPCell c = new PdfPCell(new Phrase("lp", font));
        table.addCell(c);
        c = new PdfPCell(new Phrase("model", font));
        table.addCell(c);
        c = new PdfPCell(new Phrase("cena", font));
        table.addCell(c);
        c = new PdfPCell(new Phrase("tax", font));
        table.addCell(c);
        c = new PdfPCell(new Phrase("value", font));
        table.addCell(c);

        int i = 0;
        float total = 0;
        for (Car car : cars) {
            float price = car.getPrice();
            float tax = car.getTax();
            float value = price * (tax / 100f + 1f);

            i++;
            c = new PdfPCell(new Phrase(Integer.toString(i), font));
            table.addCell(c);
            c = new PdfPCell(new Phrase(car.getModel(), font));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(price), font));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(tax) + "%", font));
            table.addCell(c);
            c = new PdfPCell(new Phrase(Float.toString(value), font));
            table.addCell(c);
            total += value;
        }

        document.add(table);

        p = new Paragraph("Kupujący: " + buyer + "| Sprzedjący: " + seller, font);
        document.add(p);

        p = new Paragraph("Total: " + total + "zl", font);
        document.add(p);

        document.close();
    }

}
