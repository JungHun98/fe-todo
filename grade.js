/** 
 * @todo
 * 조건 검사 함수로 바꾸기, 주석 작성하기
 * 
 */ 
 
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

/** 
 * todo list의 모든 상태 출력
*/
const showAll = function() {
    console.log(`현재상태 : todo: ${statusCount.todo}개, doing: ${statusCount.doing}개, done: ${statusCount.done}개`);
}

/**
 * todo list에서 선택한 상태의 모든 요소 출력 
 * @param {String} type 출력할 상태 
 */
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
        const items = [];

        todosArr.forEach(item => {
            if(item.status === type) items.push(` '${item.name}, ${item.id}번'`);
        });

        console.log(result + items.join(','));
    }
}

/**
 * 사용자가 입력한 show 명령문 처리
 * @param {Array} optionArr string[]
 */
const showItem = function(optionArr) {
    if(optionArr.length > 1) {
        console.log("invalid command");
        return;
    }

    const showOption = optionArr[0];

    if(showOption === "all") showAll();
    else showType(showOption);
}

/**
 * str이 배열 형태의 문자열인지 판별
 * @param {String} str 사용자가 입력한 TagList
 * @returns {boolean}
 */
const isArrayString = function (str) {
    const regex = /\["([^"]+)"(?:,\s*"([^"]+)")*\]/;
    return regex.test(str);
}

/**
 * 무작위로 고유한 id 생성
 * @returns {Number} id
 */
const getId = function (){
    let id;
    do{
        id = Math.ceil(Math.random() * 1000);
    }while(todosArr.some(item => item.id === id)) 

    return id;
}

/**
 * 사용자가 입력한 add 명령문 처리
 * @param {Array} optionArr string[]
 */
const addItem = function(optionArr){
    if(optionArr.length !== 2){
        console.log("invalid command");
        return;
    }

    const [additionalName, additionalTag] = optionArr;

    if(!isArrayString(additionalTag)) {
        console.log("invalid command");
        return;
    }
    
    let newId = getId();
    todosArr.push({
        name: additionalName,
        tags: JSON.parse(additionalTag),
        status: "todo",
        id: newId
    });

    statusCount.todo++;
    console.log(`${additionalName} 1개가 추가되었습니다.(id: ${newId})`)
    showAll();
}

/**
 * 사용자가 입력한 update 명령문 처리
 * @param {Array} optionArr string[]
 */
const deleteItme = function(optionArr){
    if(optionArr.length > 1) {
        console.log("invalid command");
        return;
    }
    const deleteTargetId = Number(optionArr[0]); 
    let target = undefined;
    
    todosArr = todosArr.filter(item => {
        if(item.id === deleteTargetId) target = item;

        return item.id !== deleteTargetId;
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

/**
 * 사용자가 입력한 update 명령문 처리
 * @param {Array} optionArr string[]
 */
const updateItem = function(optionArr) {
    if(optionArr.length !== 2) {
        console.log("invalid command");
        return;
    }

    const [updateTargetId, updateTargetStatus] = optionArr;

    todosArr = todosArr.map(item => {
        if(item.id === Number(updateTargetId)) {
            statusCount[item.status]--;
            statusCount[updateTargetStatus]++;
            console.log(`${item.name} ${updateTargetStatus}으로 상태가 변경되었습니다.`);
            return {...item, status: updateTargetStatus};
        }
        else return item;
    });

    showAll();
}

/**
 * 사용자가 입력한 명령어 처리
 * @param {String} line 명령문
 */
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