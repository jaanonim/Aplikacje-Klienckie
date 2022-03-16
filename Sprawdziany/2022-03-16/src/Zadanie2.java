public class Zadanie2 {
    public static void main(String[] args) {
        int parz = 0;
        int niep = 0;
        for (int i = 1; i < 101; i++) {
            if(i%2==0){
                parz +=i;
            }
            else {
                niep +=i;
            }
        }
        System.out.println("Program sumuje liczby parzyste od 1 do 100.");
        System.out.println("Suma liczb parzystych "+parz);
        System.out.println("Suma liczb nie parzystych "+niep);
    }
}
