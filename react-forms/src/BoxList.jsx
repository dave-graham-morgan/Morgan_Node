import React, {useState} from 'react';
import Box from "./Box.jsx";
import NewBoxForm from './NewBoxForm';

function BoxList(){
    const INITIAL_STATE = [
        {
            backgroundColor:'green',
            width:'100px',
            height: '100px'},
        {
            backgroundColor: 'crimson',
            width: '50px',
            height: '50px'
        }
    ]
    const [boxes, setBoxes] = useState(INITIAL_STATE);

    const addBox = (backgroundColor, width, height) => {
        setBoxes(boxes => [...boxes, {backgroundColor, width, height}])
    }
    const removeBox = (idx) => {
        setBoxes(boxes => boxes.filter((_,index) => idx !== index));
    }

    return (
        <>
            <h1>Tiny Boxes</h1>
            {boxes.map((box, idx) => {
                return <Box key={idx} id={idx} startingBackground={box.backgroundColor} startingWidth={box.width} startingHeight={box.height} removeBox={removeBox}/>
            })}
            <NewBoxForm addBox={addBox}/>
        </>
    )
}

export default BoxList;