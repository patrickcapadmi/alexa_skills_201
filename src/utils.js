/* globals
module
*/

function getDateSSML(date){
    return `<say-as interpret-as="date" format="ymd">${date}</say-as>`;
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max-min+1)+min);
}

function randomEntry(array){
    return array[getRandom(0, array.length - 1)];
}

module.exports ={
    getDateSSML: getDateSSML,
    randomEntry: randomEntry
}
