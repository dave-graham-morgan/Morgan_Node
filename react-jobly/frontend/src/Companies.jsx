import React, {useEffect, useState} from "react";
import JoblyApi from "./api.js";
import Company from "./Company.jsx";
import "./Companies.css";
import SearchBar from "./SearchBar.jsx";


function Companies(){
    const [companyData, setCompanyData] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPageLoading(true);
                const response = await JoblyApi.getAllCompanies();
                setCompanyData(response);
                setPageLoading(false);
            }catch(e){
                setPageError(e);
                console.debug("Error retrieving company data "+ e)
                setPageLoading(false);
            }
        }
        fetchData();
    }, []);
    if(pageLoading) return <div className="loadingSpinner"></div>
    if(pageError) return <div>Error: {error.message}</div>

    const doSearch = async (searchTerm)=> {

        try{
            console.log("going to search" + searchTerm)
            setPageLoading(true);
            const response = await JoblyApi.getCompaniesByName(searchTerm);
            console.log(response)
            setCompanyData(response);
            setPageLoading(false);
        }catch(e){
            setPageError(e)
            console.debug("Error retrieving company data "+ e)
            setPageLoading(false);
        }

    }

    return(
        <>
            <SearchBar search={doSearch}/>
            <div className="company-container">
                {companyData.map((co) => (
                    <Company
                        key={co.handle}
                        handle={co.handle}
                        name={co.name}
                        numEmployees={co.numEmployees}
                        description={co.description}
                    />
                ))}
            </div>
        </>

    )
}

export default Companies