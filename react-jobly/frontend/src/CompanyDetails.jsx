import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import JoblyApi from "./api.js";
import Company from "./Company.jsx";

function CompanyDetails(){
    const [companyData, setCompanyData] = useState([]);
    const {handle} = useParams();
    const navigate = useNavigate();

    if(!handle) navigate("/companies")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await JoblyApi.getCompany(handle);
                setCompanyData(response);
                console.log("response is: ")
                console.log(response)
            }catch(e){
                console.debug("Error retrieving company data "+ e)
                return navigate("/companies")
            }
        }
        fetchData();
    }, []);

    return(
        <>
            <h1>company details</h1>
            <Company
                key={companyData.handle}
                handle={companyData.handle}
                name={companyData.name}
                numEmployees={companyData.numEmployees}
                description={companyData.description}
            />
        </>
    )
}
export default CompanyDetails