import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import Jobs from "./Jobs.jsx";
import Job from "./Job.jsx";
import Companies from "./Companies.jsx";
import CompanyDetails from "./CompanyDetails.jsx";
import Profile from "./Profile.jsx";


function AppRouter(){
    return(
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/Jobs" element={<Jobs />}/>
                <Route path="/Jobs/:id" element={<Job />}/>
                <Route exact path="/Companies" element={<Companies />}/>
                <Route path="/Companies/:handle" element={<CompanyDetails />}/>
                <Route exact path="/Profile" element={<Profile />}/>
            </Routes>
        </BrowserRouter>

    )
}
export default AppRouter;