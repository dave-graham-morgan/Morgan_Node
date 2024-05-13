// add whatever parameters you deem necessary
function countPairs(array, compareNum) {
    let answer = 0;
    while(array.length>0){
        let currNum = array.pop();
        let partnerNum = compareNum - currNum;
        let idx = array.indexOf(partnerNum)
        if(idx !== -1){
            answer ++;
            array.splice(idx, 1);
        }
    }
    return answer;
}
