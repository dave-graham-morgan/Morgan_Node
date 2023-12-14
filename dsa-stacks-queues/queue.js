/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  //queue is first in first out
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let new_node = new Node(val);
    //if there is at least one node 
    if (this.last){
      this.last.next = new_node;
      this.last = new_node;
      this.size ++;
    }else{
      this.first = new_node;
      this.last = new_node;
      this.size ++;
    }
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.first){
      let currFirstVal = this.first.val
      let newFirst = this.first.next;
      this.first = newFirst;
      this.size --;
      return currFirstVal;
    }else{
      throw new error ('queue is empty')
    }

  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if(this.first){
      return false;
    }else{
      return true;
    }
  }
}

module.exports = Queue;
