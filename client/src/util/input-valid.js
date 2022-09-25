// way to check if a string is a number
// reference: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number#answer-24457420
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

export function checkType(value){
    if(typeof value != 'number'){
        value = Number(value);
        if(isNumeric(value)) value = Number(value);
        else value = 1;
    }
    return value
}

export function checkRange(value){
    if(value < 1) value = 1;
    if(value > 25) value = 25;
    return value;
}