import java.util.Scanner;

public class Zadanie6 {
    private static String revers(String txt){
        char[] arry = txt.toCharArray();
        String out ="";
        for (int i = arry.length-1; i>=0; i--) {
            out += arry[i];
        }
        return  out;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        String s2 = revers(s);
        System.out.println(s2);
        System.out.println(revers(s2));
    }
}
