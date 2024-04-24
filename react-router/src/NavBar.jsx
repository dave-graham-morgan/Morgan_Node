import React from "react";
import {Link} from "react-router-dom";

function NavBar() {

    return(
        <>
            <div>
                <Link to={"/chips"}>chips </Link>
                <Link to={"/peanut"}>peanuts </Link>
                <Link to={"/soda"}>Soda</Link>
            </div>
        </>
    )
}
export default NavBar