import React, {useState} from "react";


function Chips() {
    const [count, setCount] = useState(0)

    const increaseCount = (e) => {
        e.preventDefault();
        setCount(count => count += 1);
    }

    return (
        <>
            <h4>Chips</h4>
            <h2>{count}</h2>
            <button onClick={increaseCount}>Bags</button>
        </>
    )

}

export default Chips