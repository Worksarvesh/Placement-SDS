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
    public ListNode reverseKGroup(ListNode head, int k) {
         ListNode after = null;
         ListNode curr = head;
         ListNode prev = null;
         int cnt =0;
         int s = 0;
         ListNode temp = head;
         while(temp!=null){ // find size of ll 
            s++;
            temp = temp.next;
         }
        if(s<k) return head;
        while(curr!=null && cnt<k){ // reverse k 
            after = curr.next;
            curr.next = prev;
            prev = curr;
            curr = after;
            cnt++;
        }
        if(after!=null){ // call recursion with after node perform it k times 
            ListNode res = reverseKGroup(after,k);
            head.next = res;
        }
        return prev;
    }
}