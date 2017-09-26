

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
        if (this.root === null) { //пусто
            return null;
        } else {
            const result = [];
            function traverseDephFirst(node) {
                const childqueue = []; // очередь для потомков
                childqueue.push(node); // добавляем узел в очередь
                while (childqueue.length > 0) {
                    node = childqueue.shift(); // извлекаем узел
                    result.push(node.data);
                    if (node.leftNode !== null) { //если есто потомки, добавляем в очередь
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
           if (node === null){ // пусто
               return null;
           }
           if (data === node.data){ // нашли нужный узел
               if (node.leftNode === null && node.rightNode === null){ // если нет потомков
                   return null; // удаляем вершину
               }
               if(node.leftNode === null){ // если нет левого потомка
                   return node.rightNode; // идем по правой ветке
               }
               if (node.rightNode === null){ // если нет правого потомка
                   return node.leftNode; // идем по левой ветке
               }
               // есть два потомка
               let tempNode = node.leftNode; //спускаемся в левую вершину
               while (tempNode.rightNode !== null){ // спускаемся до крайней правой вершины
                    tempNode = tempNode.rightNode;
               }

               node.data = tempNode.data; // вставляем значение вместо удаленной вершины
               node.leftNode = delNode(node.leftNode, tempNode.data); // идем по левой ветке
               return node;

           }  else if (data < node.data) { // если значение меньше текущего
               node.leftNode = delNode(node.leftNode, data); // идем по левой ветке
               return node;
           } else {
               node.rightNode = delNode(node.rightNode, data); // иначе идем по правой
               return node;
           }
       }
        this.root = delNode(this.root, data);
    }

    findMin() {
        if (this.root === null){ // пусто
            return null;
        }
        let current = this.root;
        while (current.leftNode !== null) { //находим крайнюю левую вершину
            current = current.leftNode;
        }
        return current.data;
    }

    findMax() {
        if (this.root === null){ // пусто
            return null;
        }
        let current = this.root;
        while (current.rightNode !== null) { // находим крайнюю правую вершину
            current = current.rightNode;
        }
        return current.data;
    }

    render(elemid){
        const renderto = document.getElementById(elemid); // контейнер
        renderto.innerHTML = '';
        if (this.root === null) { // пусто
            return null;
        } else {
            function traverseDephFirst(node) { // обходим в ширину
                const childqueue = [];
                childqueue.push(node);
                let key = 0;
                while (childqueue.length > 0) {
                    key++;
                    node = childqueue.shift();
                    let elem = document.createElement('div');
                    elem.classList.add('node_'+key); // добавляем ключ для контейнера
                    elem.classList.add('node');
                    let dataContainer = document.createElement('div');
                    dataContainer.classList.add('vertical-line');
                    let data = document.createElement('span');
                    let line = document.createElement('span');

                    if (node.type && key > 1){ // если не корень
                        elem.classList.add('tree_'+node.type); // классы для левой/правой ветви
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

                    delete node.parent; // удаляем временные свойства
                    delete node.type;

                    if (node.leftNode !== null) {
                        node.leftNode.parent = key; // создаем временное свойство для привязки родителя
                        node.leftNode.type = 'left'; // создаем временное свойство для указания ветви
                        childqueue.push(node.leftNode); // добавляем узел в очередь
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

// Add

tree.add(8);
tree.add(4);

// delete
tree.del(8);

console.log(tree.traverse({order:'pre'})); // обход в прямом порядке
console.log(tree.traverse({order:'in'})); // симметричный обход
console.log(tree.traverse({order:'post'})); // обход в обратном порядке

// render
tree.render();
*/