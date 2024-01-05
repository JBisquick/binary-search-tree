function createNode(value = null, left = null, right = null) {
  return {
    value,
    left,
    right
  };
}

function createTree(treeArray) {
  treeArray.sort((a, b) => a - b);
  treeArray = treeArray.filter((value, index) => treeArray.indexOf(value) === index);

  const buildTree = (array) => {
    if (array.length === 0) {
      return null;
    } 
    const mid = array.splice(array.length / 2, 1);
    // to make it no longer array
    let midNumber = mid[0];
    // + 0.5 is so that if the array is odd, the left side will pick up the extra number 
    // in the array, which will always be smaller due to how mid works
    const left = array.splice(0, (array.length / 2) + 0.5);
    const right = array;
    const node = createNode(midNumber, buildTree(left), buildTree(right));
    return node;
  };

  const insert = (value, node = root) => {
    if (node === null){
      const newNode = createNode(value);
      return newNode;
    }

    if (node.value > value) {
      node.left = insert(value, node.left);
    } else if (node.value < value) {
      node.right = insert(value, node.right);
    }
    return node;
  };

  const remove = (value, node = root) => {
    if (node === null) {
      return null;
    } 

    if (node.value < value) {
      node.right  = remove(value, node.right);
    } else if (node.value > value) {
      node.left = remove(value, node.left)
    } else {
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }
      tempNode = node.right;
      while (tempNode.left != null) {
        tempNode = tempNode.left;
      }
      node.value = tempNode.value;
      node.right = remove(node.value, node.right);
    }

    return node;
  };

  const find = (value, node = root) => {
    if (node === null) {
      return null;
    }

    if (node.value === value) {
      return node;
    } else if (node.value < value) {
      return find(value, node.right);
    } else if (node.value > value) {
      return find(value, node.left);
    } 
  };

  const levelOrder = (callback) => {
    queue = [root];
    results = [];

    while (queue.length > 0) {
      let node = queue.shift();
      if (!callback) results.push(node.value);
      if (node.left !== null) queue.unshift(node.left);
      if (node.right !== null) queue.push(node.right);

      if (callback) callback(node.value);
    }

    if(!callback) return results;
  };

  const inOrder = (callback, node = root) => {
    if (node === null) return [];
    let order = [];
    order = order.concat(inOrder(callback, node.left));
    
    order.push(node.value);
    if (callback) callback(node.value);
    
    order = order.concat(inOrder(callback, node.right));
    if (!callback) return order;
  };

  const preOrder = (callback, node = root) => {
    if (node === null) return [];
    let order = [];
    order.push(node.value);
    if (callback) callback(node.value);

    order = order.concat(preOrder(callback, node.left));
    
    order = order.concat(preOrder(callback, node.right));
    if (!callback) return order;
  };

  const postOrder = (callback, node = root) => {
    if (node === null) return [];
    let order = [];

    order = order.concat(postOrder(callback, node.left));
    
    order = order.concat(postOrder(callback, node.right));

    order.push(node.value);
    if (callback) callback(node.value);
    if (!callback) return order;
  };

  const height = (node = root) => {
    // -1 is to fix the height to reduce it by one
    if (node === null) return -1;
    const leftValue = height(node.left);
    const rightValue = height(node.right);
    if (leftValue >= rightValue) return 1 + leftValue;
    if (leftValue <= rightValue) return 1 + rightValue;
  };

  const depth = (value, node = root) => {
    if (node === null) {
      return null;
    }

    if (node.value === value) {
      return 0;
    } else if (node.value < value) {
      depthVal = depth(value, node.right);
    } else if (node.value > value) {
      depthVal = depth(value, node.left);
    } 
    return 1 + depthVal;
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const root = buildTree(treeArray);

  return {
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    prettyPrint
  };
}

const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(9);
tree.remove(23);
tree.prettyPrint();
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.height());
console.log(tree.depth(9));