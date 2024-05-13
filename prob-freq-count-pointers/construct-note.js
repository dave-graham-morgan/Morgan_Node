// add whatever parameters you deem necessary
function constructNote(message, letters) {
    if(letters.length < message.length) return false;
    const buildMap = (str) => {
        const map = new Map();
        const stringArray = str.split('');
        for(let currChar of stringArray){
            if(map.get(currChar)){
                map.set(currChar, map.get(currChar)+1);
            }else{
                map.set(currChar, 1);
            }
        }
        return map;
    }

    const messageMap = buildMap(message);
    const lettersMap = buildMap(letters);

    for(let [key, value] of messageMap){
        if (value > lettersMap.get(key)){
            return false
        }

    }
return true;
}
