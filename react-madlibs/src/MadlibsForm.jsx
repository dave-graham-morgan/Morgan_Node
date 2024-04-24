import React, {useState, useEffect} from 'react';
import FormField from "./FormField.jsx";
import Story from "./Story.jsx";


function MadlibsForm(){
    const INITIAL_STATE = {noun:"", noun2:"", adjective:"", color:""};
    const [isVisible, setIsVisible] = useState(false);
    const [storyData, setStoryData] = useState(INITIAL_STATE);
    const [disabledButton, setDisabledButton] = useState(true);

    const getData = (data, id) => {
        console.log(data, id);
        switch (id){
            case 1:
                setStoryData({noun:data, noun2:storyData.noun2, adjective: storyData.adjective, color: storyData.color})
                break;
            case 2:
                setStoryData({noun2:data, noun:storyData.noun, adjective:storyData.adjective, color: storyData.color})
                break;
            case 3:
                setStoryData({adjective:data, noun: storyData.noun, noun2: storyData.noun2, color:storyData.color})
                break;
            case 4:
                setStoryData({color:data, adjective:storyData.adjective, noun: storyData.noun, noun2: storyData.noun2})
        }

    }
    useEffect(()=>{
            if (Object.values(storyData).every(value => value)){
                setDisabledButton(false);
            }
        }, [storyData]
    )

    const getStory = () => {
        setIsVisible(!isVisible)
    }

    const handleReset = () => {
        setIsVisible(!isVisible);
        setStoryData(INITIAL_STATE);
        setDisabledButton(true);
    }

    return (
        <>
            {!isVisible && <FormField placeholder={"noun"} getData={getData} id={1}/>}
            {!isVisible && <FormField placeholder={"noun 2"} getData={getData} id={2}/>}
            {!isVisible && <FormField placeholder={"adjective"} getData={getData} id={3}/>}
            {!isVisible && <FormField placeholder={"color"} getData={getData} id={4}/>}
            {!isVisible && <button onClick={getStory} disabled={disabledButton}>Get Story</button>}
            {isVisible && <Story noun1={storyData.noun} noun2={storyData.noun2} adjective={storyData.adjective} color={storyData.color}/>}
            {isVisible && <button onClick={handleReset}>Reset</button>}

        </>
    )
}

export default MadlibsForm;