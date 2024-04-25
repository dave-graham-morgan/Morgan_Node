import React from "react";
import Dog from "./Dogs";

function Home(){
    return(
        <>
            <Dog src={"whiskey"} name={"Whiskey"} age={"5"} facts={whiskeyFacts}/>
            <Dog src={"Duke"} name={"Duke"} age={"3"} facts={dukeFacts}/>
            <Dog src={"perry"} name={"Perry"} age={"4"} facts={perryFacts}/>
        </>
        )

}
export default Home