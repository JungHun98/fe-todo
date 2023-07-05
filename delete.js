import { isValidCommand } from './validationAPI.js';
import todo from './todo.js';
import { showAll } from './show.js';

/**
 * 사용자가 입력한 update 명령문 처리
 * @param {Array} optionArr string[]
 */
const deleteItme = function(optionArr){
    if(!isValidCommand(optionArr, "delete")) {
        console.log("invalid command");
        return;
    }
    const deleteTargetId = Number(optionArr[0]); 
    let target = undefined;
    
    todo.todosArr = todo.todosArr.filter(item => {
        if(item.id === deleteTargetId) target = item;

        return item.id !== deleteTargetId;
    })
    
    if(target){
        todo.statusCount[target.status]--;
        console.log(`${target.name} ${target.status} 목록에서 삭제됐습니다`);
        showAll();
    }
    else{
        console.log("invalid id");
    }    
}

export {deleteItme};