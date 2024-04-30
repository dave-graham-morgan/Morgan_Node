function unroll(squareArray) {
    //[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]
    const answer = [];
    const over = () => {

        for (let i = 0; i<squareArray[0].length;i++){
            answer.push(squareArray[0][i])
        }
        squareArray.shift();
    }

    const down = () => {
        for (let i = 0; i<squareArray.length;i++){
            answer.push(squareArray[i].pop());
        }
    }

    const back = () => {
        let lastArray = squareArray.length-1;
        let numLoops = squareArray[lastArray].length
        for(let i = 0; i<numLoops;i++){
            answer.push(squareArray[lastArray].pop());
        }
        squareArray.pop();

    }
    //[ 5, 6, 7 ], [ 9, 10, 11 ]
    const up = () => {
        let lastArray = squareArray.length-1
        for(let i = lastArray;i>=0;i--){
            answer.push(squareArray[i].shift());
        }

    }
    while(squareArray.length > 0){
        if(squareArray.length === 0) break;
        over(0);
        if(squareArray.length === 0) break;
        down();
        if(squareArray.length === 0) break;
        back();
        if(squareArray.length === 0) break;
        up();
    }

    return answer;
}

module.exports = unroll;
