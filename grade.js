const todosArr = require('./todo.js').todos;
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

    if(statusCount[type] === 0) console.log(type + "리스트 : 총 0건");
    else {
        let result = `${type}리스트 : 총 ${statusCount[type]}건 :`;
        let items = [];

        todosArr.forEach(item => {
            if(item.status === type) items.push(` '${item.name}, ${item.id}번'`);
        })

        console.log(result + items.join(','));
    }
}

const show = function(optionArr) {
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

const add = function(optionArr){
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

const excute = function(line){
    const cmdArr = line.split('$');
    
    const command = cmdArr[0];

    if(command === 'show') show(cmdArr.slice(1)); // show() 
    else if(command === 'add') add(cmdArr.slice(1)) // add()
    else if(command === 'delete') console.log('delete') // delete()
    else if(command === 'update') console.log('update') // update()
    else rl.close();
};

rl.on("line", function(line){
    excute(line);

    // rl.close();
})
.on("close", function(){
    process.exit();
})