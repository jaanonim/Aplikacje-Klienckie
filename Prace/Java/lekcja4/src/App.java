import java.util.Scanner;

class Clock {
    private int hour;
    private int minute;

    Clock(int hour, int minute) {
        this.hour = hour;
        this.minute = minute;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Clock other = (Clock) obj;
        if (this.hour != other.hour) {
            return false;
        }
        if (this.minute != other.minute) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return hour * 31 + minute;
    }

    public void add(int minutes) {
        this.hour += minutes / 60;
        this.minute += minutes % 60;
        if (this.minute >= 60) {
            this.hour += this.minute / 60;
            this.minute = this.minute % 60;
        }
        if (this.hour >= 24) {
            this.hour = this.hour % 24;
        }
    }

    public void subtract(int minutes) {
        this.hour -= minutes / 60;
        this.minute -= minutes % 60;
        if (this.minute < 0) {
            this.hour -= 1;
            this.minute = 60 + this.minute;
        }
        if (this.hour < 0) {
            this.hour = 24 + this.hour;
        }
    }

    @Override
    public String toString() {
        return this.hour + ":" + this.minute;
    }

}

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("=========== ZEGARY");
        Clock c1 = new Clock(10, 10);
        Clock c2 = new Clock(10, 10);
        System.out.println("wywołanie c1.toString()");
        System.out.println(c1);
        System.out.println("wywołanie c1.hashCode()");
        System.out.println(c1.hashCode());
        System.out.println("wywołanie c1.equals(c2)");
        System.out.println(c1.equals(c2));

        try (Scanner s = new Scanner(System.in)) {
            System.out.println("podaj liczbę minut do dodania:");
            c1.add(s.nextInt());
            System.out.println("wywołanie c1.toString()");
            System.out.println(c1);
            System.out.println("podaj liczbę minut do odjęcia:");

            c1.subtract(s.nextInt());
        }

        System.out.println("wywołanie c1.toString()");
        System.out.println(c1);
    }
}
