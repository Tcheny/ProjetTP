import React, { Component } from "react";
import axios from "axios";
import { Card, Nav } from "react-bootstrap";

export default class About extends Component {
    state = { userInfo: null };

    getUserId = async () => {
        // probleme requete
        axios
            .get(`http://localhost:8081/users/userInfos`, {
                params: { id: this.props.userId }
            })
            .then(res => {
                debugger;
                console.log("ABout", res.data);
                // this.setState({ userInfo: res.data });
            })
            .catch(error => {
                console.error(error);
            });
    };

    componentDidMount = () => {
        this.getUserId();
    };

    render() {
        const { userInfo } = this.state;
        const { currentUser } = this.props;

        let firstname = "";
        let lastname = "";
        let pseudo = "";
        let infos = "";

        if (currentUser) {
            firstname = currentUser.user_firstname;
            lastname = currentUser.user_lastname;
            pseudo = currentUser.user_pseudo;
            infos = currentUser.user_infos;
        }

        return (
            <Card className="text-center">
                <Card.Header>A propos de moi</Card.Header>
                <Card.Img
                    variant="top"
                    src="holder.js/100px180?text=Image cap"
                />
                <Card.Body>
                    <Card.Title>
                        {lastname} {firstname}
                    </Card.Title>
                    <Card.Text>pseudo : {pseudo}</Card.Text>
                    <Card.Title>Petit détail</Card.Title>
                    <Card.Text>{infos}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Nav.Link href="#/">Home</Nav.Link>
                </Card.Footer>
            </Card>
        );
    }
}
