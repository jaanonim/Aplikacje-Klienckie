import java.util.Scanner;

public class Zadanie1 {
    public static void main(String[] args) {
        System.out.println("Podaj promień");
        Scanner sc = new Scanner(System.in);
        double r = Double.parseDouble(sc.nextLine());
        double objetosc = (4 * (r * r * r) * Math.PI)/3;
        objetosc = objetosc * 100;
        objetosc = Math.round( objetosc );
        System.out.println(r+"Objętośc wynosi "+(objetosc/100));
    }
}
