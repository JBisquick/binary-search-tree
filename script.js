const createTree = require('./binaryTree');

const randomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  };

let tree = createTree(randomArray(30));

tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

for (let i = 0; i < 5; i++) {
    tree.insert(Math.floor(Math.random() * 100) + 100);
  }

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
