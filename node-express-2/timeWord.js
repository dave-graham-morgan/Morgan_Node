
/**main function to convert time into word. 
 * NOTE... per requirements, there is absolutely zero error handling in this function
 * I'm expecting that the system will always recieve a valid time
 * represented by a 5 character string
 * the string will be comprised of two digits a colon and two more digits.
 * any dievation from that and this won't work. Any invalid times
 * such as 35:00 or 12:80 and this won't work even if the string 
 * matches the expected pattern. 
*/
function timeWord(string){
   if(string === "00:00"){
      return "midnight"
   }
   if(string === "12:00"){
      return "noon"
   }
   const firstPair = string.slice(0,2);
   const secondPair = string.slice(3);
   const timePeriod = parseInt(firstPair) < 12 ? 'am' : 'pm';
   const hour = calculateHour(firstPair);
   let minute;
   if (parseInt(secondPair)>=20){
      minute = calculateLargerMinutes(secondPair)
   }else{
      minute = calculateSmallerMinutes(secondPair);
   }
   return `${hour} ${minute} ${timePeriod}`
}

//for refactor, check if the number > 12 and if so... subtract 12
function calculateHour(timePair){
   if(timePair === '00') return 'twelve';
   if(timePair === '01') return 'one';
   if(timePair === '02') return 'two';
   if(timePair === '03') return 'three';
   if(timePair === '04') return 'four';
   if(timePair === '05') return 'five';
   if(timePair === '06') return 'six';
   if(timePair === '07') return 'seven';
   if(timePair === '08') return 'eight';
   if(timePair === '09') return 'nine';
   if(timePair === '10') return 'ten';
   if(timePair === '11') return 'eleven';
   if(timePair === '12') return 'twelve';
   if(timePair === '13') return 'one';
   if(timePair === '14') return 'two';
   if(timePair === '15') return 'three';
   if(timePair === '16') return 'four';
   if(timePair === '17') return 'five';
   if(timePair === '18') return 'six';
   if(timePair === '19') return 'seven';
   if(timePair === '20') return 'eight';
   if(timePair === '21') return 'nine';
   if(timePair === '22') return 'ten';
   if(timePair === '23') return 'eleven';
   if(timePair === '24') return 'twelve';
}
function calculateSmallerMinutes(timePair){
   if(timePair === '00') return `o'clock`;
   if(timePair === '01') return 'oh one';
   if(timePair === '02') return 'oh two';
   if(timePair === '03') return 'oh three';
   if(timePair === '04') return 'oh four';
   if(timePair === '05') return 'oh five';
   if(timePair === '06') return 'oh six';
   if(timePair === '07') return 'oh seven';
   if(timePair === '08') return 'oh eight';
   if(timePair === '09') return 'oh nine';
   if(timePair === '10') return 'ten';
   if(timePair === '11') return 'eleven';
   if(timePair === '12') return 'twelve';
   if(timePair === '13') return 'thirteen';
   if(timePair === '14') return 'fourteen';
   if(timePair === '15') return 'fifteen';
   if(timePair === '16') return 'sixteen';
   if(timePair === '17') return 'seventeen';
   if(timePair === '18') return 'eighteen';
   if(timePair === '19') return 'nineteen';
}
function calculateLargerMinutes(timePair){
   const timeInt = parseInt(timePair);
   if(timeInt >=20 && timeInt < 30){
      return "twenty" + calculateDigit(timePair);
   }
   if(timeInt >=30 && timeInt < 40){
      return "thirty" + calculateDigit(timePair);
   }
   if(timeInt >=40 && timeInt < 50){
      return "fourty" + calculateDigit(timePair);
   }
   if(timeInt >=50 && timeInt < 60){
      return "fifty" + calculateDigit(timePair);
   }
}
//there is some duplication with calculateHour function
//consider combining the two functions for next refactor.
//for now this works though. 
function calculateDigit(timePair){
   const digit = timePair.slice(1)
   if(digit === '0') return '';
   if(digit === '1') return ' one';
   if(digit === '2') return " two";
   if(digit === '3') return " three";
   if(digit === '4') return " four";
   if(digit === '5') return " five";
   if(digit === '6') return " six";
   if(digit === '7') return " seven";
   if(digit === '8') return " eight";
   if(digit === '9') return " nine";
}

module.exports = timeWord;