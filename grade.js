/** 
 * @todo
 * 주석 작성하기
 * 
 */ 
import readline from  "readline"
import { showItem } from './show.js';
import { addItem } from './add.js';
import { deleteItme } from './delete.js';
import { updateItem } from './update.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt('명령하세요 : ');
rl.prompt()

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
    rl.prompt();
    // rl.close();
})
.on("close", function(){
    process.exit();
})