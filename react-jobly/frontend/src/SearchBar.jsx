import React, {useState} from "react";
import { Button } from 'reactstrap';

function SearchBar({search}){
    const [searchText, setSearchText] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        search(searchText);
    }

    return(
        <>
            <form onSubmit={handleClick}>
                <input type="text" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <Button color="success" size="sm" className="m-2" onClick={handleClick} >Search</Button>
            </form>

        </>
    )
}

export default SearchBar