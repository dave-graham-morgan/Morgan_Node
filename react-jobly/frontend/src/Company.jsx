import React from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

function Company({handle, name, numEmployees, description}){
    return(
        <Card style={{width: '18rem'}}>
            <CardBody>
                <a href={`/companies/${handle} `}>
                <CardTitle tag="h5">
                    {name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                    {handle}
                </CardSubtitle>
                </a>
            </CardBody>
            <CardBody>
                <CardText>
                    {description}
                </CardText>
            </CardBody>
            <CardBody>
                <CardText>
                    {numEmployees} employees
                </CardText>
            </CardBody>
        </Card>
    )
}
export default Company
