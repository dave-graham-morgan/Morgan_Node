function merge(arr1, arr2) {
    const answer = [];
    let i = 0;
    let j = 0;
    while(i<arr1.length && j<arr2.length){
        if(arr1[i] < arr2[j]){
            answer.push(arr1[i]);
            i++;
        }else{
            answer.push(arr2[j]);
            j++;
        }
    }
    while(i<arr1.length){
        answer.push(arr1[i]);
        i++;
    }
    while(j<arr2.length){
        answer.push(arr2[j]);
        j++;
    }
    return answer;
}

function mergeSort(arr) {
    if (arr.length <= 1 ) return arr;
    let mid = Math.floor(arr.length/2);
    let leftArray = mergeSort(arr.slice(0, mid));
    let rightArray = mergeSort(arr.slice(mid));
    return merge(leftArray, rightArray);
}

module.exports = { merge, mergeSort};