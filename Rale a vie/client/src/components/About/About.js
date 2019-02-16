import React, { Component } from "react";
import {
    Card,
    Modal,
    Button,
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";
import NavbarApp from "../NavbarApp/index";
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
        const { user } = this.state;

        return (
            <div className="profile-page">
                <NavbarApp />

                <Card className="page-header header-filter text-center">
                    <Card.Body className="main main-raised">
                        <div className="profile-content">
                            <Container>
                                <Row>
                                    <Col md={{ span: 8, offset: 2 }}>
                                        {user && (
                                            <div className="profile">
                                                <Card.Img
                                                    className="img-raised rounded-circle img-fluid"
                                                    src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
                                                />
                                                <Card.Title>
                                                    {user.user_firstname}
                                                    <br />
                                                    {user.user_lastname}
                                                </Card.Title>
                                                <Card.Text>
                                                    pseudo : {user.user_pseudo}
                                                </Card.Text>
                                                <Card.Text className="description text-center">
                                                    {user.user_infos}
                                                </Card.Text>
                                                <Button
                                                    variant="primary"
                                                    onClick={this.handleShow}
                                                >
                                                    Edit profil
                                                </Button>

                                                <Modal
                                                    size="lg"
                                                    aria-labelledby="contained-modal-title-vcenter"
                                                    centered
                                                    show={this.state.show}
                                                    onHide={this.handleClose}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>
                                                            Vos informations :
                                                        </Modal.Title>
                                                    </Modal.Header>

                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group
                                                                as={Row}
                                                                controlId="formBasicEmail"
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    Prénom
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="text"
                                                                        defaultValue={
                                                                            user.user_firstname
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_firstnameField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="Prénom"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Row}
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    Nom
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="text"
                                                                        defaultValue={
                                                                            user.user_lastname
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_lastnameField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="Nom"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Row}
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    E-mail
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="email"
                                                                        defaultValue={
                                                                            user.user_email
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_emailField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="E-mail"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Row}
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    Mot de passe
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="password"
                                                                        defaultValue={
                                                                            user.user_password
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_passwordField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="Mot de passe"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Row}
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    Pseudo
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="text"
                                                                        defaultValue={
                                                                            user.user_pseudo
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_pseudoField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="Pseudo"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Row}
                                                            >
                                                                <Form.Label
                                                                    column
                                                                    sm="2"
                                                                >
                                                                    Infos
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control
                                                                        type="text"
                                                                        defaultValue={
                                                                            user.user_infos
                                                                        }
                                                                        onChange={e => {
                                                                            this.handleChange(
                                                                                {
                                                                                    user_infosField:
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                }
                                                                            );
                                                                        }}
                                                                        placeholder="Détails"
                                                                    />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={
                                                                this.handleClose
                                                            }
                                                        >
                                                            Fermer
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={
                                                                this.editProfil
                                                            }
                                                        >
                                                            Enregistrer les
                                                            changements
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
