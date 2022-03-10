import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.UUID;

public class Car {
    private UUID uuid;
    private String model;
    private int year;
    private ArrayList<Airbag> airbags;
    private String color;

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
                "\"uuid\":\""+uuid.toString()+"\""+
                ", \"model\":\"" + model + '\"' +
                ", \"year\":" + year +
                ", \"airbags\":" + airbags +
                ", \"color\":\"" + color + '\"' +
                '}';
    }

    public Car copy(){
        Car copy = new Car();
        copy.setModel(this.model);
        copy.setColor(this.color);
        copy.setAirbags(this.airbags);
        copy.setUuid(this.uuid);
        copy.setYear(this.year);
        return copy;
    }
}
