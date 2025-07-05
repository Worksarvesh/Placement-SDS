public class DAY01 {
    public static void main(String[] args) {
        int []arr = {1,1,3,4,7,8};
        System.out.println(linearSearch(arr,9));
    }
    static int linearSearch(int[]arr,int x){
        for (int i = 0; i < arr.length; i++) {
            if(arr[i]==x){
               return i;
            }
        }
        return -1;
    }
}