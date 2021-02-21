module.exports = function check(str, bracketsConfig) {
    return checkInt(str, bracketsConfig);
}




/**
 *
 * @param {string} bracket
 * @param {string[][]} bracketsConfig
 */
function containsInOpenings(bracket, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++){
        let conf = bracketsConfig[i];
        if (conf[0] === bracket)
            return i;
    }

    return -1;
}

/**
 *
 * @param {string} bracket
 * @param {string[][]} bracketsConfig
 */
function containsInClosings(bracket, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++){
        let conf = bracketsConfig[i];
        if (conf[1] === bracket)
            return i;
    }

    return -1;
}

/**
 *
 * @param {string} bracket
 * @param {string[][]} bracketsConfig
 */
function openingAndClosingAreTheSame(bracket, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++){
        let conf = bracketsConfig[i];
        if (conf[0] === bracket && conf[1] === bracket)
            return true;
    }
    
    return false;
}


/**
 * 
 * @param {string} str
 * @param {string[][]} bracketsConfig
 */
function checkInt(str, bracketsConfig) {
    const stack = [];

    for (let bracket of str) {
        if (openingAndClosingAreTheSame(bracket, bracketsConfig)) {
            if (stack[stack.length - 1] !== bracket)
                stack.push(bracket);
            else
                stack.pop();
            
        } else if (containsInOpenings(bracket, bracketsConfig) !== -1) {
            // Открывающая скобка
            stack.push(bracket);
        } else {
            let r = containsInClosings(bracket, bracketsConfig);
            if (r === -1)
                return false;

            let openingBracket = stack.pop();
            if (openingBracket !== bracketsConfig[r][0])
                return false;
        }
    }

    return stack.length === 0;
}



// console.log(checkInt('||', [['|', '|']]));
// console.log(checkInt('[]()', [['|', '|'], ['(', ')'], ['[', ']']]));
// console.log(checkInt('|[]()|', [['|', '|'], ['(', ')'], ['[', ']']]));
// console.log(checkInt('1243', [['1', '3'], ['2', '4'], ['[', ']']]));
// console.log(checkInt('||(||)||', [['(', ')'], ['|', '|']]));
