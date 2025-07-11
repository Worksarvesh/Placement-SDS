/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // if(head == null){
        //     return null;
        // }
        // // find size 
        // int m =0;
        // ListNode temp = head;
        // while(temp!=null){
        //     m++;
        //     temp = temp.next;
        // }
        // if(n>m){
        //     return head;
        // }
        // if(n==m){
        //     return head.next;
        // }
        
        // int dist = m-n;
        // ListNode t = head;
        // for(int i=1;i<dist;i++){
        //     t = t.next;
        //     }
        //     t.next = t.next.next;
        //     return head;
        if (head == null) {
            return null;
        }

        ListNode dummy = new ListNode(0); 
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;

        // Move fast pointer n nodes ahead
        for (int i = 0; i <= n; i++) {
            if(fast == null){
                return dummy.next; 
            }
            fast = fast.next;
        }

        // Move both pointers until fast reaches the end
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Remove the nth node from the end
        slow.next = slow.next.next;

        return dummy.next;
    }
        
}
