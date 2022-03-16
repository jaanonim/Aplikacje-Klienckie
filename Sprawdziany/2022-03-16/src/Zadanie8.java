import java.util.Scanner;

public class Zadanie8 {
    public static void main(String[] args) {
        Osoba o = new Osoba();
        o.init();
    }
}

class Osoba{
    private String nazwisko;
    private String miasto;
    private String kod;

    public void init(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Podaj nazwisko:");
        nazwisko=sc.nextLine();

        System.out.println("Podaj miasto:");
        miasto=sc.nextLine();

        System.out.println("Podaj kod:");
        kod=sc.nextLine();
        while (!check(kod)){
            System.out.println("Podaj kod poprawny:");
            kod=sc.nextLine();
        }

        this.display();
    }

    public void display(){
        System.out.println("=======================\n" +
                "Wyświetlenie danych\n" +
                "Nazwisko: "+nazwisko+"\n" +
                "Miasto: "+miasto+"\n" +
                "Kod: "+kod);
    }

    public boolean check(String kod){
        char [] arr = kod.toCharArray();
        char [] allowed = {'1','2','3','4','5','6','7','8','9','0'};
        if(arr.length!=6){
            return false;
        }
        for (int i = 0; i < arr.length; i++) {
            if(i==2){
                if(arr[i]!='-'){
                    return false;
                }
            }
            else {
                boolean found = false;
                for (int j = 0; j < allowed.length; j++) {
                    if(allowed[j]==arr[i]){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    return false;
                }
            }
        }
        return true;
    }
}