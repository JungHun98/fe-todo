import { isValidCommand, isValidShowType } from './validationAPI.js';
import todo from './todo.js';

const ZERO = 0

/** 
 * todo list의 모든 상태 출력
*/
const showAll = function() {
    console.log(`현재상태 : todo: ${todo.statusCount.todo}개, doing: ${todo.statusCount.doing}개, done: ${todo.statusCount.done}개`);
}

/**
 * todo list에서 선택한 상태의 모든 요소 출력 
 * @param {String} type 출력할 상태 
 */
const showType = function(type) {
    if(!isValidShowType(type)) {
        console.log("invalid command");
        return;
    }

    if(todo.statusCount[type] === ZERO) {
        console.log(type + "리스트 : 총 0건");
    }
    else {
        let result = `${type}리스트 : 총 ${todo.statusCount[type]}건 :`;
        const items = [];

        todo.todosArr.forEach(item => {
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
    if(!isValidCommand(optionArr, "show")) {
        console.log("invalid command");
        return;
    }

    const showOption = optionArr[0];

    if(showOption === "all") showAll();
    else showType(showOption);
}

export {showItem, showAll};