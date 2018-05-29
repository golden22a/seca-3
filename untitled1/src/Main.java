public class Main {
    public static void reverseArray(int[] a){
        int i;
        int c;
        for(i=0;i<=(a.length)/2-1;i++){

            c=a[i];
            a[i]=a[a.length-1-i];
            a[a.length-1-i]=c;

        }

    }


    public static void main(String[] args) {

        int[] a= new int[]{1,2,3,4,5};
        reverseArray(a);
        String b="Hey";
        int i = b.length();
        b+="yeh";
       b= b.substring(i);
        System.out.println(b);


//        for (int i = 0; i < a.length; i++)
//            System.out.println("Element at index " + i +
//                    " : "+ a[i]);


    }
}
