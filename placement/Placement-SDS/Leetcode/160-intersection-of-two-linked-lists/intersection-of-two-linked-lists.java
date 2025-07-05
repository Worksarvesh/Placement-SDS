/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // find size of lish A
        ListNode t1 = headA;
        ListNode t2 = headB;
        int m = 0;
        while(t1!=null){
            m++;
            t1 = t1.next;
        }
        int n =0;
        while(t2!=null){
            n++;
            t2 = t2.next;
        }
        t1 = headA;
        t2 = headB;
        if(m>n){
            int steps = m-n;
            for(int i=1;i<=steps;i++){
            t1 = t1.next;
        }
        }
        else{
            int steps = n-m;
            for(int i=1;i<=steps;i++){
            t2 = t2.next;
        }
    }
        while(t1!=t2){
            t1 = t1.next;
            t2 = t2.next;
        }
    return t2;
        }

        
       
    }
