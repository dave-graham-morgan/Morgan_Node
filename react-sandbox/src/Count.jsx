import React, {useState} from "react";

function Count(){
    const [count, setCount] = useState(0);
    // setInterval(()=>{
    //     setCount(count => count+1);
    // }, 1000)
    return(
        <>
            <h1>{count}</h1>
        </>
    )
}
export default Count