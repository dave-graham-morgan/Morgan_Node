// add whatever parameters you deem necessary
function averagePair(array, average) {
    if (array.length === 0) return false;
    left = 0;
    right = array.length-1;

    while(left < right){
        let currAverage = array[left] + array[right] / 2;
        if(currAverage === average){
            return true;
        }else if(currAverage > average){
            right --;
        }else{
            left ++;
        }
    }
    return false;
}
