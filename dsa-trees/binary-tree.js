/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;
    let children = [this.root];
    let answer = 0;

    while(children.length > 0){
      answer += 1;
      let currChild = children.shift();
      if(!currChild.left && !currChild.right) {
        return answer;
      }
      if(currChild.left){
        children.push(currChild.left);
      }
      if(currChild.right){
        children.push(currChild.right);
      }
    }
  }


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if(node === null){
      return 0;
    }
    const leftDepth = this.maxDepth(node.left);
    const rightDepth = this.maxDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if(!this.root){
      return 0;
    }
    let result = { max: Number.MIN_SAFE_INTEGER }; // Use an object to maintain reference
    this._maxPathSum(this.root, result);
    return result.max;
  }

  _maxPathSum(node, result) {
    if (!node) return 0;

    // Calculate the max path sum recursively for left and right children
    const left = Math.max(0, this._maxPathSum(node.left, result)); // Only add positive sums
    const right = Math.max(0, this._maxPathSum(node.right, result)); // Only add positive sums

    // Calculate the max path as if the current node is the "lowest" point of the path
    result.max = Math.max(result.max, node.val + left + right);

    // Return the maximum sum path of one side only
    return node.val + Math.max(left, right);
  }


  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    // Helper function to traverse the tree
    const traverse = (node) => {
      if (!node) return;

      // Check if the current node's value is greater than the lower bound
      if (node.val > lowerBound) {
        // If result is not set or current node's value is smaller than result, update result
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      // Continue to traverse the tree
      traverse(node.left);
      traverse(node.right);
    };

    // Start the traversal from the root
    traverse(this.root);

    // Return the found result or null if no suitable node was found
    return result;
  }


  /**
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e., are at the same level but have different parents).
   */
  areCousins(node1, node2) {
    // Helper function to find the parent and depth of a node
    const findParentAndDepth = (node, target, depth = 0, parent = null) => {
      if (!node) return null;

      if (node.val === target.val) {
        return { parent, depth };
      }

      // Look for the target in the left subtree
      let leftResult = findParentAndDepth(node.left, target, depth + 1, node);
      if (leftResult) return leftResult;

      // Look for the target in the right subtree
      return findParentAndDepth(node.right, target, depth + 1, node);
    };

    // Find parent and depth for both nodes
    const node1Data = findParentAndDepth(this.root, node1);
    const node2Data = findParentAndDepth(this.root, node2);

    if (!node1Data || !node2Data) {
      return false; // One or both nodes are not in the tree
    }

    // Check if nodes are at the same level and have different parents
    return (node1Data.depth === node2Data.depth) && (node1Data.parent !== node2Data.parent);
  }


  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
