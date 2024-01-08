/** product: calculate the product of an array of numbers. */
// /expect(product([2, 3, 4])).toBe(24)
function product(nums) {
  //base condition
  if (nums.length === 0) return 1;

  //recursive case
  let firstNum = nums.shift()
  return firstNum * product(nums)
}

/** longest: return the length of the longest word in an array of words. */
//expect(longest(["hello", "hi", "hola"])).toBe(5);
function longest(words) {
  //base condition
  if (words.length === 0) return 0;

  //recursive
  let firstWord = words.shift();
  let longestInArray = longest(words)
  if (firstWord.length > longestInArray){
    return firstWord.length;
  }else{
    return longestInArray
  }
}

/** everyOther: return a string with every other letter. */
//expect(everyOther("hello")).toBe("hlo");
function everyOther(str) {
  //base
  if(str.length === 0) return "";

  //recurisve
  if(str.length > 1){
    return str[0] + everyOther(str.slice(2))
  }else{
    return str[0]
  }
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  //base
  if (str.length === 0) return true;
  
  //recursion
  if (str[0] === str[str.length-1] && isPalindrome(str.slice(1,str.length-1))){
    return true;
  }else{
    return false;
  }
    
}


/** findIndex: return the index of val in arr (or -1 if val is not present). */
//findIndex(animals, "duck")).toBe(0);
function findIndex(arr, val) {
//base
if(arr.length === 0) return -1;

//recursive
if(arr[0].valueOf() === val.valueOf()){
  return 0;
}else{
  let index = findIndex(arr.slice(1), val)
  if(index === -1){
    return -1;
  }else{
    return index + 1
  }
}
}


/** revString: return a copy of a string, but in reverse. */
//expect(revString("porcupine")).toBe("enipucrop");

function revString(str) {
  //base
  if(str.length === 0) return "";

  //recursion
  let answer = str[str.length-1] + revString(str.slice(0,str.length-1))
  return answer;
}



/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  //base
  if (Object.keys(obj).length === 0) return [];

  //recusion

  let firstKey = Object.keys(obj)[0]
  let firstValue = obj[firstKey]
  delete obj[firstKey];
  let objType = typeof firstValue;

  if (typeof firstValue === "string"){
    return [firstValue].concat(gatherStrings(obj))
  }else if (typeof firstValue === "object" && firstValue !== null){
    return gatherStrings(firstValue).concat(gatherStrings(obj))
  }else{
    return gatherStrings(obj)
  }

}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

//expect(binarySearch([1, 2, 3, 4], 4)).toEqual(3);
function binarySearch(arr, val) {
  
  //base
  if(arr.length === 0) return -1;

  //recursion
  
  if(arr[0] === val){
    return 0;
  }else{
    let answer = binarySearch(arr.slice(1), val) 
    if(answer === -1){
      return -1;
    }else{
      answer = binarySearch(arr.slice(1), val) + 1;
      return answer;
    }

  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
