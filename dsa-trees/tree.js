/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if(!this.root) return 0;
    let children = [this.root];
    let answer = 0;

    while(children.length > 0){
      let currChild = children.pop()
      answer = answer + currChild.val;
      children = [...children, ...currChild.children];
    }
    return answer;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
      if(!this.root) return 0;
      let children = [this.root];
      let answer = 0;

      while(children.length > 0){
        let currChild = children.pop();
        if(currChild.val % 2 === 0){
          answer += 1;
        }
        if(currChild.children && currChild.children.length > 0){
          children.push(...currChild.children);
        }

      }
      return answer;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if(!this.root) return 0;
    let children = [this.root];
    let answer = 0;

    while(children.length > 0){
      let currChild = children.pop();
      if(currChild.val > lowerBound){
        answer += 1;
      }
      if(currChild.children && currChild.children.length > 0){
        children.push(...currChild.children);
      }

    }
    return answer;
  }
}


module.exports = { Tree, TreeNode };
