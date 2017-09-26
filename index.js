const output = document.getElementById('output');

addForm = document.getElementById('add');
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let dataInp = addForm.querySelector('[name=data]');
    let data = dataInp.value;
    if (data !== ''){
        tree.add(+data);
        tree.render('render');
        dataInp.value = '';
        dataInp.focus();
    }
});

delForm = document.getElementById('delete');
delForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let dataInp = delForm.querySelector('[name=data]');
    let data = dataInp.value;
    if (data !== ''){
        tree.del(+data);
        tree.render('render');
        dataInp.value = '';
        dataInp.focus();
    }
});


trForm = document.getElementById('traverse');
trForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let dataInp = trForm.querySelector('[name=type]');
    let type = dataInp.value;

    switch (type){
        case "1": {
            output.innerHTML = tree.traverse({order:'pre'});
            break
        }
        case "2": {
            output.innerHTML = tree.traverse({order:'in'});
            break
        }
        case "3": {
            output.innerHTML = tree.traverse({order:'post'});
            break
        }
        case "4": {
            output.innerHTML = tree.traverseLevels();
            break
        }
    }
});

let btnMin = document.getElementById('findMin');
btnMin.addEventListener('click', function () {
output.innerHTML = tree.findMin();
});

let btnMax = document.getElementById('findMax');
btnMax.addEventListener('click', function () {
output.innerHTML = tree.findMax();
});






