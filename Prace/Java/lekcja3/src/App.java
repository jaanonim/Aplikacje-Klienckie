import java.util.Scanner;

public class App {

    static String alphabet = "abcdefghijklmnopqrstuvwxyz";

    public static void main(String[] args) throws Exception {
        System.out.print("Napis do analizy: ");
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        sc.close();
        System.out.println("Brakujece znaki: " + check(input));
    }

    static String check(String str) {
        str = str.toLowerCase();
        String missingChars = "";
        for (int i = 0; i < alphabet.length(); i++) {
            if (!str.contains("" + alphabet.charAt(i))) {
                missingChars += alphabet.charAt(i);
            }
        }
        return missingChars;
    }
}
