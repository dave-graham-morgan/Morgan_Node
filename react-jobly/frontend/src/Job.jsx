import React from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

function Job({title, salary, equity, companyName}){
    return(
        <Card style={{width: '18rem'}}>
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    {salary}
                </CardSubtitle>
            </CardBody>
            <CardBody>
                <CardText>
                    {equity || "Not available"}
                </CardText>
            </CardBody>
            <CardBody>
                <CardText>
                    Company Name: {companyName}
                </CardText>
            </CardBody>
        </Card>
    )
}
export default Job