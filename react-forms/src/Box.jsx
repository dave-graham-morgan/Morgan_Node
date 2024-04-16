import React from 'react';
import "./Box.css";

function Box({startingBackground = 'lightblue', startingWidth='150px', startingHeight='50px', removeBox, id}){

    const handleSubmit = (e) => {
        e.preventDefault();
        removeBox(id);
    }
    return (
        <>
            <div className="box-border" style={{
                backgroundColor: startingBackground,
                width: startingWidth,
                height: startingHeight
            }}>
            </div>
            <button onClick={handleSubmit}>x</button>
        </>

    )
}

export default Box;