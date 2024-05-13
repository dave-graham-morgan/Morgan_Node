// add whatever parameters you deem necessary
function longestFall(array) {
    if (array.length === 0) return 0;
    let answer = 1;
    let iterAnswer = 1;
    for (let i = 0; i<array.length;i++){
        if(array[i]>array[i+1]){
            iterAnswer ++;
        }else{
            if(iterAnswer>answer){
                answer = iterAnswer;
            }
            iterAnswer = 1;
        }
    }
    return answer;
}
