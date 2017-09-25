

// node
class Node {
    constructor(data, leftNode = null, rightNode = null){
        this.data = data;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

// binary search tree
class BSTree {
    constructor(){
        this.root = null;
    }

    // добавление узла
    add(data) {
        const node = this.root;
        if (node === null){ // дерево пустое, добавляем корневую вершину
            this.root = new Node(data);
        } else {
            const searchTree = function (node) {
                if (data < node.data){ // если добавляемое значение меньше текущего
                    if (node.leftNode === null ){ // если нет левого узла, добавляем значение
                        node.leftNode = new Node(data);
                    } else {
                        return searchTree(node.leftNode) // иначе спускаемся по левой ветке
                    }
                } else{
                    if (node.rightNode === null){ // если нет правого узла, добавляем значений
                        node.rightNode = new Node(data);
                    } else {
                        return searchTree(node.rightNode) // иначе спускаемся по правой ветке
                    }
                }
            };
            return searchTree(node);
        }
    }



    // обход дерева
    traverse(options = {order: 'pre'}) {
        if (this.root === null) {
            return null;
        } else {
            const result = [];
            function traverseOrder(node) {
                if (options.order === 'pre'){ // обход в прямом порядке
                    result.push(node.data); // обрабатываем узел
                }
                if (node.leftNode !== null){
                    traverseOrder(node.leftNode); // идем в левый узел
                }
                if (options.order === 'in'){ // симметричный обход
                    result.push(node.data); // обрабатываем узел
                }
                if (node.rightNode !== null){
                    traverseOrder(node.rightNode) // идем в правый узел
                }
                if (options.order === 'post'){ // обход в обратном порядке
                    result.push(node.data); // обрабатываем узел
                }
            }
            traverseOrder(this.root);
            return result;
        }
    }

    // обход в ширину
    traverseLevels(){
        if (this.root === null) {
            return null;
        } else {
            const result = [];
            function traverseDephFirst(node) {

                const childqueue = [];
                childqueue.push(node);

                while (childqueue.length > 0) {
                    node = childqueue.shift();
                    result.push(node.data);
                    if (node.leftNode !== null) {
                        childqueue.push(node.leftNode);
                    }
                    if (node.rightNode !== null) {
                        childqueue.push(node.rightNode);
                    }
                }
            }
            traverseDephFirst(this.root);
            return result;
        }

    }

    del(data) {

       function delNode(node, data) {
           if (node === null){
               return null;
           }
           if (data === node.data){
               if (node.leftNode === null && node.rightNode === null){
                   return null;
               }
               if(node.leftNode === null){
                   return node.rightNode;
               }
               if (node.rightNode === null){
                   return node.leftNode;
               }
               let tempNode = node.rightNode;
               while (tempNode.leftNode !== null){
                    tempNode = tempNode.leftNode;
               }
               node.data = tempNode.data;
               node.rightNode = delNode(node.rightNode, tempNode.data);
               return node;

           }  else if (data < node.data) {
               node.leftNode = delNode(node.leftNode, data);
               return node;
           } else {
               node.rightNode = delNode(node.rightNode, data);
               return node;
           }
       }
        this.root = delNode(this.root, data);
    }
    
    render(){
        const renderto = document.getElementById('render');
        renderto.innerHTML = '';

        if (this.root === null) {
            return null;
        } else {
            function traverseDephFirst(node) {
                const childqueue = [];
                childqueue.push(node);
                //let level = 0;
                let key = 0;
                while (childqueue.length > 0) {
                    key++;
                    node = childqueue.shift();
                    let elem = document.createElement('div');
                    elem.classList.add('node_'+key);
                    elem.classList.add('node');

                    let dataContainer = document.createElement('div');
                    dataContainer.classList.add('vertical-line');
                    let data = document.createElement('span');
                    let line = document.createElement('span');

                    if (node.type && key > 1){
                        elem.classList.add('tree_'+node.type);
                        line.classList.add('node-line_'+node.type);
                    }

                    data.innerHTML = node.data;
                    data.classList.add('circle');
                    dataContainer.appendChild(line);
                    dataContainer.appendChild(data);
                    elem.appendChild(line);
                    elem.appendChild(dataContainer);

                    if (key === 1){ // корневой элемент
                        renderto.appendChild(elem);
                    } else { // добавляем в контейнер родителя
                        let parent = document.querySelector('.node_'+node.parent);
                        parent.appendChild(elem);

                    }

                    delete node.parent;
                    delete node.type;

                    if (node.leftNode !== null) {
                        node.leftNode.parent = key;
                        node.leftNode.type = 'left';
                        childqueue.push(node.leftNode);
                    }
                    if (node.rightNode !== null) {
                        node.rightNode.parent = key;
                        node.rightNode.type = 'right';
                        childqueue.push(node.rightNode);
                    }
                }
            }
            traverseDephFirst(this.root);
        }
    }


}


let tree = new BSTree();
/*
tree.add(8);
tree.add(4);
tree.add(2);
tree.add(3);
tree.add(10);
tree.add(6);
tree.add(7);
tree.add(5);
tree.add(9);
tree.add(22);
tree.add(30);
tree.add(15);
tree.add(1);
tree.add(12);

tree.add(15);

*/

//tree.del(30);
//tree.del(8);
//tree.del(8);

//console.log(tree.traverse({order:'pre'})); // обход в прямом порядке
//console.log(tree.traverse({order:'in'})); // симметричный обход
//console.log(tree.traverse({order:'post'})); // обход в обратном порядке

//tree.render();



//tree.render();