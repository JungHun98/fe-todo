import { isValidCommand, isArrayString } from './validationAPI.js';
import todo from './todo.js';
import { showAll } from './show.js';

/**
 * 무작위로 고유한 id 생성
 * @returns {Number} id
 */
const getId = function (){
    let id = Math.ceil(Math.random() * 1000);
    
    while(todo.todosArr.some(item => item.id === id)){
        id++; 
    }

    return id;
}

/**
 * 사용자가 입력한 add 명령문 처리
 * @param {Array} optionArr string[]
 */
const addItem = function(optionArr){
    if(!isValidCommand(optionArr, "add")){
        console.log("invalid command");
        return;
    }

    const [additionalName, additionalTag] = optionArr;

    if(!isArrayString(additionalTag)) {
        console.log("invalid command");
        return;
    }
    
    let newId = getId();
    todo.todosArr.push({
        name: additionalName,
        tags: JSON.parse(additionalTag),
        status: "todo",
        id: newId
    });

    todo.statusCount.todo++;
    console.log(`${additionalName} 1개가 추가되었습니다.(id: ${newId})`)
    showAll();
}

export {addItem};