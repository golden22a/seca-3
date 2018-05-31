import java.lang.reflect.Array;
import java.util.*;

public class Main {
    static public boolean isArmstrongNumber(int n) {
        int number = n;
        int reminder;
        int some = 0;
        while (n != 0) {
            reminder = n % 10;
            some += Math.pow(reminder, 3);
            n = n / 10;
        }
        return some == number;

    }

    public static boolean isPalendron(String s) {
        int length = s.length();
        for (int i = 0; i < length - 1 / 2; i++) {
            if (s.toLowerCase().charAt(i) != s.toLowerCase().charAt(length - 1 - i)) {
                return false;
            }

        }
        return true;
    }

    public static int recSearch(int a[], int n) {
        if (a.length == 0) {
            return -1;
        }
        System.out.println(a.length);
        int first = 0;
        int last = (a.length - 1) / 2;

        if (a[first] == n) {
            return first;
        } else if (a[last] == n) {
            return last;
        } else if (n > a[last]) {
            return recSearch(Arrays.copyOfRange(a, last, a.length), n);
        } else if (n > a[first]) {
            return recSearch(Arrays.copyOfRange(a, first, a.length), n);
        }
        return -1;
    }

    public static int[] removeduplicate(int a[]) {
        List<Integer> b = new ArrayList<Integer>();

        for (int i = 0; i < a.length; i++) {
            if (!exists(toIntArray(b), a[i])) {
                b.add(a[i]);
            }
        }
        return toIntArray(b);
    }

    public static int[] toIntArray(List<Integer> intList) {
        return intList.stream().mapToInt(Integer::intValue).toArray();
    }


    public static boolean exists(int a[], int n) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == n) {
                return true;
            }
        }
        return false;
    }
    public static int[] remove2(int a[]){
        boolean found=false;
        List<Integer> b = new ArrayList<Integer>();



        for(int i=0;i<a.length;i++) {
            found=false;
            for (int j = i + 1; j < a.length; j++) {
                if (a[i] == a[j])
                    found = true;
                break;
            }
            if(!found){
                b.add(a[i]);
            }
        }
        return toIntArray(b);
    }

    public static int[] remove3(int a[]){
        Map<String,Integer> b = new HashMap<>();

        for(int i=0;i<a.length;i++) {
            if(!b.containsKey(""+a[i])){
                b.put(""+a[i],new Integer(a[i]));
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
        int[] a = {1, 2, 3, 3, 4, 1, 1, 5};
        a=(removeduplicate(a));
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i]);
        }
    }
}