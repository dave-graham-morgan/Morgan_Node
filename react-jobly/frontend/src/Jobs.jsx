import React, {useEffect, useState} from "react";
import JoblyApi from "./api.js";
import Job from "./Job.jsx";
import "./Jobs.css"

function Jobs(){
    const [jobData, setJobData] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPageLoading(true);
                const response = await JoblyApi.getAllJobs();
                setJobData(response);
                setPageLoading(false);
                console.log(response)
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

    return(
        <div className="job-container">
            {jobData.map((job) => (
                <Job
                    key={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    )
}
export default Jobs