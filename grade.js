const todos = require('./todo.js').todos;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const excute = function(line){
    const cmdArr = line.split('$');
    
    const command = cmdArr[0];

    if(command === 'show') console.log('show')//show() 
    else if(command === 'add') console.log('add')// add()
    else if(command === 'delete') console.log('delete')// add()
    else if(command === 'update') console.log('update')// add()
    else rl.close();
};

rl.on("line", function(line){
    excute(line);

    // rl.close();
})
.on("close", function(){
    process.exit();
})