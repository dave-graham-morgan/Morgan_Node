import React from "react";
import Peanut from "./Peanut.jsx";
import Soda from "./Soda.jsx";
import Chips from "./Chips.jsx";
import NavBar from "./NavBar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function VendingMachine(){

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/peanut" element={<Peanut/>}></Route>
                    <Route path="/soda" element={<Soda/>}></Route>
                    <Route path="/chips" element={<Chips/>}></Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}
export default VendingMachine;