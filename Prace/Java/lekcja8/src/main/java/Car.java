import java.util.ArrayList;
import java.util.Random;
import java.util.UUID;

import com.fasterxml.uuid.Generators;
import com.itextpdf.text.pdf.fonts.cmaps.CMapParserEx;

public class Car {
    private UUID uuid;
    private String model;
    private int year;
    private ArrayList<Airbag> airbags;
    private String color;
    private Float price;
    private int tax;
    private CustomDate date;

    public CustomDate getDate() {
        return date;
    }

    public void setDate(CustomDate date) {
        this.date = date;
    }

    public int getTax() {
        return tax;
    }

    public void setTax(int tax) {
        this.tax = tax;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public ArrayList<Airbag> getAirbags() {
        return airbags;
    }

    public String getColor() {
        return color;
    }

    public void setAirbags(ArrayList<Airbag> airbags) {
        this.airbags = airbags;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUuid() {
        return uuid;
    }

    @Override
    public String toString() {
        return "{" +
                "\"uuid\":\"" + uuid.toString() + "\"" +
                ", \"model\":\"" + model + '\"' +
                ", \"year\":" + year +
                ", \"airbags\":" + airbags +
                ", \"color\":\"" + color + '\"' +
                ", \"price\":\"" + price + '\"' +
                ", \"date\":" + date +
                '}';
    }

    public Car copy() {
        Car copy = new Car();
        copy.setModel(this.model);
        copy.setColor(this.color);
        copy.setAirbags(this.airbags);
        copy.setUuid(this.uuid);
        copy.setYear(this.year);
        copy.setPrice(this.price);
        copy.setTax(tax);
        copy.setDate(date);
        return copy;
    }

    static public Car randomCar() {
        UUID uuid = Generators.randomBasedGenerator().generate();
        String[] model = { "Name", "lol0", "gfd", "cos" };
        int[] year = { 2001, 2002, 2003, 2004 };
        String[] color = { "#ffffff", "#000000", "#ff0000", "#00ff00" };
        int[] tax = { 0, 7, 23 };
        Random r = new Random();
        Car copy = new Car();
        copy.setModel(model[r.nextInt(model.length)]);
        copy.setColor(color[r.nextInt(color.length)]);
        copy.setUuid(uuid);
        copy.setTax(tax[r.nextInt(tax.length)]);
        copy.setYear(year[r.nextInt(year.length)]);
        ArrayList<Airbag> airbags = new ArrayList<Airbag>();
        airbags.add(new Airbag("tl", true));
        airbags.add(new Airbag("tr", true));
        airbags.add(new Airbag("bl", true));
        airbags.add(new Airbag("br", true));
        copy.setAirbags(airbags);
        copy.setDate(CustomDate.randomDate());
        copy.setPrice(r.nextInt(100000 - 1000) + 100 / 100f);
        return copy;
    }
}
