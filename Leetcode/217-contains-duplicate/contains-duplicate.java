class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        boolean res = false;
        for(int i=0;i<nums.length-1;i++){
             if(nums[i]==nums[i+1]){
                res = true;
                break;
             }
            
        }
        return res;
    }
}