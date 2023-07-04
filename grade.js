let todosArr = require('./todo.js').todos;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const statusCount = {
    todo: 2,
    doing: 1,
    done: 0
}

const showAll = function() {
    console.log(`현재상태 : todo: ${statusCount.todo}개, doing: ${statusCount.doing}개, done: ${statusCount.done}개`);
}

const showType = function(type) {
    if(type !== "todo" && type !== "doing" && type !== "done") {
        console.log("invalid command");
        return;
    }

    if(statusCount[type] === 0) {
        console.log(type + "리스트 : 총 0건");
    }
    else {
        let result = `${type}리스트 : 총 ${statusCount[type]}건 :`;
        let items = [];

        todosArr.forEach(item => {
            if(item.status === type) items.push(` '${item.name}, ${item.id}번'`);
        });

        console.log(result + items.join(','));
    }
}

const showItem = function(optionArr) {
    if(optionArr.length > 1) {
        console.log("invalid command");
        return;
    }

    if(optionArr[0] === "all") showAll();
    else showType(optionArr[0]);
}

const isArrayString = function (str) {
    const regex = /\["([^"]+)"(?:,\s*"([^"]+)")*\]/;
    return regex.test(str);
}

const getId = function (){
    let id;
    do{
        id = Math.ceil(Math.random() * 1000);
    }while(todosArr.some(item => item.id === id)) 

    return id;
}

const addItem = function(optionArr){
    if(optionArr.length !== 2){
        console.log("invalid command");
        return;
    }

    if(!isArrayString(optionArr[1])) {
        console.log("invalid command");
        return;
    }
    
    let newId = getId();
    todosArr.push({
        name: optionArr[0],
        tags: JSON.parse(optionArr[1]),
        status: "todo",
        id: newId
    });

    statusCount.todo++;
    console.log(`${optionArr[0]} 1개가 추가되었습니다.(id: ${newId})`)
    showAll();
}

const deleteItme = function(optionArr){
    if(optionArr.length > 1) {
        console.log("invalid command");
        return;
    }

    let id = Number(optionArr[0]);
    let target = undefined;
    
    todosArr = todosArr.filter(item => {
        if(item.id === id) target = item;

        return item.id !== id;
    })
    
    if(target){
        statusCount[target.status]--;
        console.log(`${target.name} ${target.status} 목록에서 삭제됐습니다`);
        showAll();
    }
    else{
        console.log("invalid id");
    }    
}

const updateItem = function(optionArr) {
    if(optionArr.length !== 2) {
        console.log("invalid command");
        return;
    }

    todosArr = todosArr.map(item => {
        if(item.id === Number(optionArr[0])) {
            statusCount[item.status]--;
            statusCount[optionArr[1]]++;
            console.log(`${item.name} ${optionArr[1]}으로 상태가 변경되었습니다.`);
            return {...item, status: optionArr[1]};
        }
        else return item;
    });

    showAll();
}

const excute = function(line){
    const cmdArr = line.split('$'); 
    const command = cmdArr[0];
    const commandOptionArr = cmdArr.slice(1);

    if(command === 'show') showItem(commandOptionArr); // show() 
    else if(command === 'add') addItem(commandOptionArr) // add()
    else if(command === 'delete') deleteItme(commandOptionArr) // delete()
    else if(command === 'update') updateItem(commandOptionArr) // update()
    else rl.close();
};

rl.on("line", function(line){
    excute(line);

    // rl.close();
})
.on("close", function(){
    process.exit();
})