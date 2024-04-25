import React from "react";
import "./Dogs.css";

function Dog({name, age, src, facts}){

    return(
        <>
            <div>
                This is {name}.  {name} is {age} years old.
            </div>
            <div>
                <img src={`/${src}.jpg`}/>
            </div>
            <div>
                {facts}
            </div>
            <br/>
        </>
    )
}

export default Dog;