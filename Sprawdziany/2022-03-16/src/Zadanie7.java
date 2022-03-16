import java.math.BigInteger;
import java.util.Scanner;

public class Zadanie7 {
    public static BigInteger LiczSilnia(int n){
        BigInteger res = new BigInteger("1");
        BigInteger one = new BigInteger("1");
        BigInteger n2 = new BigInteger(""+n);

        for (BigInteger i = one; i.compareTo(n2)<0; i = i.add(one)) {
            res = res.multiply(i);
            System.out.println(res);
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println("Podaj liczbe");
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());
        LiczSilnia(n);
    }
}
