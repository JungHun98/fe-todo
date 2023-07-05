const SINGLE_ITEM_LENGTH = 1;
const DOUBLE_ITEM_LENGTH = 2;

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
 * 유효한 show 명령 옵션인지 판별
 * @param {String} type show명령 옵션
 * @returns {boolean}
 */
const isValidShowType = function (type){
    return type === "todo" || type === "doing" || type === "done" 
}

/**
 * 
 * @param {String[]} optionArr 
 * @param {String} cmdType 
 * @returns {boolean}
 */
const isValidCommand = function(optionArr, cmdType){
    if(cmdType === 'show' || cmdType === 'delete') return optionArr.length === SINGLE_ITEM_LENGTH  
    else if(cmdType === 'add' || cmdType === 'update') return optionArr.length === DOUBLE_ITEM_LENGTH 
}

export {isArrayString, isValidShowType, isValidCommand};