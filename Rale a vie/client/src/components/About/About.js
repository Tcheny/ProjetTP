import React, { Component, Fragment } from "react";
import { Card, Nav } from "react-bootstrap";
import { schtroumpf } from "../../../images/Schtroumpf-2.png";

export default class About extends Component {
    render() {
        const { currentUser } = this.props;

        return (
            <Card className="text-center">
                <Card.Header>A propos de moi</Card.Header>
                <Card.Img variant="top" src={schtroumpf} />
                <Card.Body>
                    {currentUser && (
                        <Fragment>
                            <Card.Title>
                                {currentUser.user_firstname}
                                <br />
                                {currentUser.user_lastname}
                            </Card.Title>
                            <Card.Text>
                                pseudo : {currentUser.user_pseudo}
                            </Card.Text>
                            <Card.Title>Petit détail</Card.Title>
                            <Card.Text>{currentUser.user_infos}</Card.Text>
                        </Fragment>
                    )}
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Nav.Link href="#/">Home</Nav.Link>
                </Card.Footer>
            </Card>
        );
    }
}
