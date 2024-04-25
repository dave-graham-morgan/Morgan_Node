import React from "react";

function Nav({dogNames}) {
    return(
        <nav>
            {dogNames.map((dog, idx)=> (
                <li key={idx}>{dog}</li>
                ))}
        </nav>
    )
}
export default Nav;