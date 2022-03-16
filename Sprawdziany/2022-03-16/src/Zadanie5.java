public class Zadanie5 {
    public static void main(String[] args) {
        int[][] tablica5 = new int[][] {
                { 1, 2 },
                { 3, 3 },
                { 1, 4 },
                { 7, 3 },
                { 1, 6 },
                { 3, 5 },
                { 1, 8 },
                { 7, 9 }
        };
        int sum = 0;
        for (int i = 0; i < tablica5.length; i++) {
            if(tablica5[i][0]==1)
            {
                sum += tablica5[i][1];
            }
        }
        System.out.println("Wynik "+sum);
    }
}
