// add whatever parameters you deem necessary
function isSubsequence(string1, string2) {
    if(string2.length<string1.length) return false;
    let string2Pointer = 0;

    const foundInString = (letter, pointer) => {
        if(pointer >=string2.length) return -1;
        while(pointer<string2.length){
            if(string2[pointer] === letter){
                return pointer;
            }else{
                pointer++;
            }
        }
        return -1;
    }

    for(let currLetter of string1){
        string2Pointer = foundInString(currLetter, string2Pointer)
        if(string2Pointer === -1) return false;
    }
    return true;
}
