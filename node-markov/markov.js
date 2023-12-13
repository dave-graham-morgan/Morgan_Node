/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovChain = this.makeChains(); 
  }

  makeChains() {
    const mvChain = {}
    for (let i = 0; i<this.words.length;i++){
      let currWord = this.words[i]
      let nextWord = this.words[i+1]

      //check if currWord is already a key in the object, if it is
      //add nextword to the value array
      if (mvChain.hasOwnProperty(currWord)){
        if(nextWord){
          mvChain[currWord].push(nextWord)
        }else{
          //check we're at the end and exit if we are
          mvChain[currWord].push(null) 
          continue;
        }
        
      }else{
        //first time we're seeing this word so create a key and an array with next word
        if(nextWord){
          mvChain[currWord] = [nextWord]
        }else{
          mvChain[currWord] = [null];
          continue;
        }
        
      }
    }
    return mvChain
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    //randomly select a start word out of our words array
    let firstWord  = this.getRandomWord(); 
    let text = [firstWord];
    while (text.length <= numWords){
      let nextWord = this.getNextWord(text[text.length-1])
      if(nextWord){
        text.push(nextWord);
      }else{
        text.push('.');
        text.push(this.getRandomWord())
      }
    }
    
    return text
  }
  getRandomWord(){
    return this.words[Math.floor(Math.random()*this.words.length)];
  }

  getNextWord(word){
    let randomValue = Math.floor(Math.random()* this.markovChain[word].length)
    return this.markovChain[word][randomValue]
  }
}


module.exports = {
  MarkovMachine,
}