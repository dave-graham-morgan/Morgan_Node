import React from "react";
import SearchBar from "./SearchBar.jsx";

function Home(){
    const searchIt = (text) => {
        console.log("and the text is: " + text)
    }
    return(
        <>
            <h1>we're home</h1>
            <SearchBar search={searchIt}/>
        </>
    )
}
export default Home