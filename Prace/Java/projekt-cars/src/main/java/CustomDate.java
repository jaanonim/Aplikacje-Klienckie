import java.util.Random;

public class CustomDate {
    private int day;
    private int month;
    private int year;

    public CustomDate(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int calcDays() {
        return year * 360 + month * 31 + day;
    }

    public static CustomDate randomDate() {
        Random r = new Random();

        return new CustomDate(r.nextInt(31) + 1, r.nextInt(12) + 1, r.nextInt(100) + 2000);
    }

    @Override
    public String toString() {
        return "{\"day\":" + day + ", \"month\":" + month + ", \"year\":" + year + "}";
    }

}
