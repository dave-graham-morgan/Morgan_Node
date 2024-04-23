function addCommas(num) {
    const str = num.toString();
    let counter = 0;
    let answer = [];

    for (let i = str.length-1; i>=0;i--){
        answer.push(str.charAt(i));
        if(str.charAt(i) === "-") continue;
        if (counter === 2){
            answer.push(",")
            counter = 0;
        }else{
            counter ++;
        }
    }
    return(answer.reverse().join(""));
}

module.exports = addCommas;