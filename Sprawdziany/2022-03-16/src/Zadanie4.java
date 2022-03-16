public class Zadanie4 {
    public static void main(String[] args) {
        double[] tablica2 = {1.1,2.2,3.3,4.4,5.5,6.6,7.7,8.8,9.9};
        double suma = 0;
        double spar =0;
        double sw = 0;

        for (int i = 0; i < tablica2.length; i++) {
            suma += tablica2[i];
            if(i%2 == 0){
                spar +=tablica2[i];
            }
            if(tablica2[i]>4.4){
                sw +=tablica2[i];
            }
        }
        System.out.println("suma wszystkich elementów = "+suma);
        System.out.println("suma elementów większych od 4.4 = "+spar);
        System.out.println("suma elementów parzystych = "+sw);
    }
}
