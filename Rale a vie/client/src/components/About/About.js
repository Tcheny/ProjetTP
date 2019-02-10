import React, { Component, Fragment } from "react";
import { Card, Nav, Modal, Button } from "react-bootstrap";
import { schtroumpf } from "../../../images/Schtroumpf-2.png";
import axios from "axios";

export default class About extends Component {
    state = {
        user: null,
        show: false,
        user_emailField: "",
        user_firstnameField: "",
        user_infosField: "",
        user_lastnameField: "",
        user_passwordField: "",
        user_pseudoField: ""
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    editProfil = () => {
        debugger;
        const user_id =
            this.props.currentUser && this.props.currentUser.user_id;
        const editUser = {
            user_email: this.state.user_emailField
                ? this.state.user_emailField
                : this.state.user.user_email,
            user_firstname: this.state.user_firstnameField
                ? this.state.user_firstnameField
                : this.state.user.user_firstname,
            user_infos: this.state.user_infosField
                ? this.state.user_infosField
                : this.state.user.user_infos,
            user_lastname: this.state.user_lastnameField
                ? this.state.user_lastnameField
                : this.state.user.user_lastname,
            user_password: this.state.user_passwordField
                ? this.state.user_passwordField
                : this.state.user.user_password,
            user_pseudo: this.state.user_pseudoField
                ? this.state.user_pseudoField
                : this.state.user.user_pseudo
        };

        axios
            .post("http://localhost:8081/users/edit", {
                user: editUser,
                user_id
            })
            .then(res => {
                this.props.verifyCurrentUser();
                this.setState({
                    user: res.data,
                    show: false
                });
            });
    };

    handleChange = stateUpdate => {
        this.setState(stateUpdate);
    };

    componentDidMount = async () => {
        await this.props.verifyCurrentUser();
        this.setState({ user: this.props.currentUser });
    };

    render() {
        const { user, currentUser } = this.state;

        return (
            <Card className="text-center">
                <Card.Header>A propos de moi</Card.Header>
                <Card.Img variant="top" src={schtroumpf} />
                <Card.Body>
                    {user && (
                        <Fragment>
                            <Card.Title>
                                {user.user_firstname}
                                <br />
                                {user.user_lastname}
                            </Card.Title>
                            <Card.Text>pseudo : {user.user_pseudo}</Card.Text>
                            <Card.Title>Petit détail</Card.Title>
                            <Card.Text>{user.user_infos}</Card.Text>
                            <Button variant="primary" onClick={this.handleShow}>
                                Edit profil
                            </Button>

                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <label>FirstName</label>
                                    <input
                                        type="text"
                                        defaultValue={user.user_firstname}
                                        onChange={e => {
                                            this.handleChange({
                                                user_firstnameField:
                                                    e.target.value
                                            });
                                        }}
                                    />

                                    <label>LastName</label>
                                    <input
                                        type="text"
                                        defaultValue={user.user_lastname}
                                        onChange={e => {
                                            this.handleChange({
                                                user_lastnameField:
                                                    e.target.value
                                            });
                                        }}
                                    />

                                    <label>Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user.user_email}
                                        onChange={e => {
                                            this.handleChange({
                                                user_emailField: e.target.value
                                            });
                                        }}
                                    />
                                    <input
                                        type="password"
                                        defaultValue={user.user_password}
                                        onChange={e => {
                                            this.handleChange({
                                                user_passwordField:
                                                    e.target.value
                                            });
                                        }}
                                    />
                                    <label>Pseudo</label>
                                    <input
                                        type="text"
                                        defaultValue={user.user_pseudo}
                                        onChange={e => {
                                            this.handleChange({
                                                user_pseudoField: e.target.value
                                            });
                                        }}
                                    />

                                    <label>Infos</label>
                                    <input
                                        type="text"
                                        defaultValue={user.user_infos}
                                        onChange={e => {
                                            this.handleChange({
                                                user_infosField: e.target.value
                                            });
                                        }}
                                    />
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={this.handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={this.editProfil}
                                    >
                                        Save changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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
