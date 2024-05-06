class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
      if(this.root === null) {
        this.root = new Node(val);
        return this;
      }else{
        let currNode = this.root;
        while(currNode){
          if(val > currNode.val){
            if(currNode.right){
              currNode = currNode.right;
              continue;
            }else{
              currNode.right = new Node(val)
              currNode = null;
            }
          }else{
            if(currNode.left){
              currNode = currNode.left;
              continue;
            }else{
              currNode.left = new Node(val)
              currNode = null;
            }
          }
        }
      }
      return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if(!this.root) {
      this.root = new Node(val)
      return this;
    }
    this.checkCurrentNode(this.root, val)
    return this;
  }
  checkCurrentNode(currNode, val){
    if(val > currNode.val){
      if(currNode.right){
        this.checkCurrentNode(currNode.right, val)
      }else{
        currNode.right = new Node(val);
      }
    }else{
      if(currNode.left){
        this.checkCurrentNode(currNode.left,val)
      }else{
        currNode.left = new Node(val);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
      let currNode = this.root;
      while(currNode){
        if(currNode.val === val){
          return currNode;
        }
        if(val > currNode.val){
          currNode = currNode.right;
        }else{
          currNode = currNode.left;
        }

      }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    return this.findNode(this.root, val)
  }
  findNode(currNode, val){
    if(!currNode) return undefined;
    if(currNode.val === val) return currNode;
    return val > currNode.val ? this.findNode(currNode.right, val): this.findNode(currNode.left,val)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const answer = []
    this.addNextPreNode(this.root,answer)
    return answer;
  }
  addNextPreNode(currNode, answer){
    if(!currNode) return;
    answer.push(currNode.val);
    if(currNode.left) {
      this.addNextPreNode(currNode.left, answer)
    }
    if(currNode.right){
      this.addNextPreNode(currNode.right, answer)
    }
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const answer = []
    this.addNextOrderNode(this.root,answer)
    return answer;
  }
  addNextOrderNode(currNode, answer){
    if(!currNode) return;
    if(currNode.left){
      this.addNextOrderNode(currNode.left, answer)
    }
    answer.push(currNode.val);
    if(currNode.right){
      this.addNextOrderNode(currNode.right, answer)
    }
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const answer = []
    this.addNextPostNode(this.root,answer)
    return answer;
  }
  addNextPostNode(currNode, answer){
    if(!currNode) return;
    if(currNode.left){
      this.addNextPostNode(currNode.left, answer)
    }
    if(currNode.right){
      this.addNextPostNode(currNode.right, answer)
    }
    answer.push(currNode.val);
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const answer = []
    answer.push(this.root.val)
    this.addBFSNode(this.root, answer)
    return answer;
  }
  addBFSNode(currNode, answer){
    if(!currNode) return;
    if(currNode.left){
      answer.push(currNode.left.val)
    }
    if(currNode.right){
      answer.push(currNode.right.val)
    }
    if(currNode.left) this.addBFSNode(currNode.left, answer)
    if(currNode.right) this.addBFSNode(currNode.right, answer)
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
