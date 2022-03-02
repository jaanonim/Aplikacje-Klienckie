public class Car {

    public String getHtml() {
        return "<tr>" +
                "<td>" + name +
                "</td><td>" + doors +
                "</td><td>" + faulty +
                "</td><td>" + lang +
                "</td></tr>";
    }

    public enum Lang {
        polski,
        angielski
    }

    private String name;
    private int doors;
    private boolean faulty;
    private Lang lang;

    public Car(String name, String doors, String faulty, String lang) {
        this.name = name;
        this.doors = Integer.parseInt(doors);
        this.faulty = faulty != null;
        this.lang = Lang.valueOf(lang);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDoors() {
        return doors;
    }

    public void setDoors(int doors) {
        this.doors = doors;
    }

    public boolean isFaulty() {
        return faulty;
    }

    public void setFaulty(boolean faulty) {
        this.faulty = faulty;
    }

    public Lang getLang() {
        return lang;
    }

    public void setLang(Lang lang) {
        this.lang = lang;
    }

    @Override
    public String toString() {
        return "Car{" +
                "name='" + name + '\'' +
                ", doors=" + doors +
                ", faulty=" + faulty +
                ", lang=" + lang +
                '}';
    }
}
