// add whatever parameters you deem necessary
function twoArrayObject(array1, array2) {
    const answer = {};
    for(let i = 0; i<array1.length;i++){
        if(array2[i]){
            answer[array1[i]] = array2[i];
        }else{
            answer[array1[i]] = null;
        }
    }
    return answer;
}
