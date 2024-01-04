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
    const left = array.splice(0, array.length / 2);
    const right = array.splice(array.length / 2);
    const node = createNode(midNumber, buildTree(left), buildTree(right));
    return node;
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
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
  prettyPrint(root);
}

const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
