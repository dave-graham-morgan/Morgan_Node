// add whatever parameters you deem necessary
function sameFrequency(int1, int2) {

    const BuildMap = (string) => {
        const newMap = new Map();
        for(let currLetter of string){
            if(newMap.get(currLetter)){
                newMap.set(currLetter, newMap.get(currLetter)+1)
            }else{
                newMap.set(currLetter, 1);
            }
        }
        return newMap;
    }

    const map1 = BuildMap(int1.toString())
    const map2 = BuildMap(int2.toString());
    for(const [key, value] of map1){
        if(map2.get(key) !== value){
            return false;
        }
    }
    return true;
}
