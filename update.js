import todo from "./todo.js"
import { isValidCommand } from './validationAPI.js';
import { showAll } from './show.js';

/**
 * 사용자가 입력한 update 명령문 처리
 * @param {Array} optionArr string[]
 */
const updateItem = function(optionArr) {
    if(!isValidCommand(optionArr, "update")) {
        console.log("invalid command");
        return;
    }

    const [updateTargetId, updateTargetStatus] = optionArr;

    todo.todosArr = todo.todosArr.map(item => {
        if(item.id === Number(updateTargetId)) {
            todo.statusCount[item.status]--;
            todo.statusCount[updateTargetStatus]++;

            console.log(`${item.name} ${updateTargetStatus}으로 상태가 변경되었습니다.`);
            return {...item, status: updateTargetStatus};
        }
        else return item;
    });

    showAll();
}

export {updateItem};