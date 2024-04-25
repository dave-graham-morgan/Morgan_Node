import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Dog from "./Dogs";
import Nav from "./Nav";

function App() {
    let whiskeyFacts = [
        "Whiskey loves eating popcorn. ",
        "Whiskey is a terrible guard dog. ",
        "Whiskey wants to cuddle with you!"
    ]

    let dukeFacts = [
        "Duke believes that ball is life. ",
        "Duke likes snow. ",
        "Duke enjoys pawing other dogs."
    ]

    const perryFacts = [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
    ]

    const dogNames = [
        "whiskey", "duke", "Perry"
    ]
  return (
    <div className="App">
        <Nav dogNames={dogNames}/>

        <Dog src={"whiskey"} name={"Whiskey"} age={"5"} facts={whiskeyFacts}/>
        <Dog src={"Duke"} name={"Duke"} age={"3"} facts={dukeFacts}/>
        <Dog src={"perry"} name={"Perry"} age={"4"} facts={perryFacts}/>
    </div>
  );
}

export default App;
