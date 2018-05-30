public class Main {
    static public boolean isArmstrongNumber(int n ){
        int number=n;
        int reminder;
        int some=0;
        while(n != 0){
          reminder= n % 10;
          some += Math.pow(reminder,3);
          n=n/10;
        }
     return some == number;

    }
    public static boolean isPalendron(String s){
        int length = s.length();
        for(int i=0; i<length-1/2;i++){
            if(s.toLowerCase().charAt(i) != s.toLowerCase().charAt(length-1-i) ){
                return false;
            }

        }
        return true;
    }
    public static int search(int a[],int n){
        int i=0;
        int j=a.length-1/2;

        while(i!=j){
           if(n == a[i]){
               return i;
           }
           if(n == a[j]){
               return j;
           }
           if(n >= a[j]){
               j = a.length-1-i;
               i=j;

           }else if( n >= a[i]) {


            }

        }

    }

    public static void main(String[] args) {

        System.out.println(isArmstrongNumber(153));
        System.out.println(isArmstrongNumber(0));
        System.out.println(isArmstrongNumber(12));
        System.out.println(isArmstrongNumber(2));
        System.out.println(isArmstrongNumber(371));
        System.out.println(isPalendron("abcba"));
        System.out.println(isPalendron("abc"));
        System.out.println(isPalendron("aba"));
    }
}
