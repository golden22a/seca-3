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
