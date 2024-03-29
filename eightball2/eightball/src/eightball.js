import React, {useState} from 'react';
import './App.css';

const Eightball = () => {

    function getRandomAnswer() {
        const randomNumber = Math.floor(Math.random() * 20);
        const responses = [
            {msg: "It is certain.", color: "green"},
            {msg: "It is decidedly so.", color: "green"},
            {msg: "Without a doubt.", color: "green"},
            {msg: "Yes - definitely.", color: "green"},
            {msg: "You may rely on it.", color: "green"},
            {msg: "As I see it, yes.", color: "green"},
            {msg: "Most likely.", color: "green"},
            {msg: "Outlook good.", color: "green"},
            {msg: "Yes.", color: "green"},
            {msg: "Signs point to yes.", color: "goldenrod"},
            {msg: "Reply hazy, try again.", color: "goldenrod"},
            {msg: "Ask again later.", color: "goldenrod"},
            {msg: "Better not tell you now.", color: "goldenrod"},
            {msg: "Cannot predict now.", color: "goldenrod"},
            {msg: "Concentrate and ask again.", color: "goldenrod"},
            {msg: "Don't count on it.", color: "red"},
            {msg: "My reply is no.", color: "red"},
            {msg: "My sources say no.", color: "red"},
            {msg: "Outlook not so good.", color: "red"},
            {msg: "Very doubtful.", color: "red"},
        ]
        return responses[randomNumber]
    }
    const [answer, setAnswer] = useState({msg: "Think of a question", color: "black"});
    const [yellowCount, setYellowCount] = useState(0);
    const [greenCount, setGreenCount] = useState(0);
    const [redCount, setRedCount] = useState(0);

    function handleClick(){
        const newAnswer = getRandomAnswer();
        setAnswer(newAnswer);
        if(newAnswer.color ==='green'){
            setGreenCount(greenCount + 1);
        }else if(newAnswer.color === 'red'){
            setRedCount(redCount+1);
        }else if(newAnswer.color === 'goldenrod'){
            setYellowCount(yellowCount+1);
        }

    }
    function reset(){
        setAnswer({msg: "Think of a question", color: "black"});
        setGreenCount(0);
        setRedCount(0);
        setYellowCount(0);
    }

    return (
        <div>
            <button onClick={handleClick} className={'ball'} style={{backgroundColor: answer.color}}>{answer.msg}</button>
            <button onClick={reset}>reset</button>
            <div>red = {redCount} green = {greenCount} yellow = {yellowCount}</div>
        </div>
    )
}
export default Eightball;