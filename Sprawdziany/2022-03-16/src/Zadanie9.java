import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie9 {
    public static ArrayList<Integer> getRow(int n,ArrayList<Integer> last){
        ArrayList<Integer> list = new ArrayList<Integer>();
        list.add(1);
        for (int i = 0; i < n-1; i++) {
            if(i==n-2){
                list.add(1);
            }
            else {
                list.add(last.get(i)+last.get(i+1));
            }
        }
        return list;
    }

    public static void main(String[] args) {

        System.out.println("Podaj rozmiar");
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());
        ArrayList<Integer> last = new ArrayList<Integer>();

        for (int i = 1; i < n+1; i++) {
            last = getRow(i,last);
            for (int j = 0; j < (n-i); j++) {
                System.out.print("\t");
            }
            for (int j = 0; j < last.size(); j++) {
                System.out.print(last.get(j)+"\t\t");
            }
            System.out.println();

        }
    }
}
