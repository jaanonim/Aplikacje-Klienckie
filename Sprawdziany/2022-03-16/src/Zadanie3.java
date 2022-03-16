public class Zadanie3 {
    public static void main(String[] args) {
        System.out.println("Program rysuje tabliczkę mnożenia");
        int x=1;
        while (x<11){
            int y=1;
            while (y<11){
                System.out.print(x*y+" ");
                if(x*y<10){
                    System.out.print(" ");
                }
                y++;
            }
            System.out.println("");
            x++;
        }
    }
}
