public class App {

    static String alphabet = "abcdefghijklmnopqrstuvwxyz";

    public static void main(String[] args) throws Exception {
        System.out.println(check("ABC"));
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
