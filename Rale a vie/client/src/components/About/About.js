import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import NavbarApp from '../NavbarApp/index';

export default class About extends Component {
    state = {
        user: null,
        show: false,
        user_emailField: '',
        user_firstnameField: '',
        user_infosField: '',
        user_lastnameField: '',
        user_passwordField: '',
        user_pseudoField: '',
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleChange = stateUpdate => {
        this.setState(stateUpdate);
    };

    editProfil = () => {
        const user_id = this.props.currentUser && this.props.currentUser.user_id;
        const editUser = {
            user_email: this.state.user_emailField ? this.state.user_emailField : this.state.user.user_email,
            user_firstname: this.state.user_firstnameField ? this.state.user_firstnameField : this.state.user.user_firstname,
            user_infos: this.state.user_infosField ? this.state.user_infosField : this.state.user.user_infos,
            user_lastname: this.state.user_lastnameField ? this.state.user_lastnameField : this.state.user.user_lastname,
            user_password: this.state.user_passwordField ? this.state.user_passwordField : this.state.user.user_password,
            user_pseudo: this.state.user_pseudoField ? this.state.user_pseudoField : this.state.user.user_pseudo,
        };

        axios
            .post('http://localhost:8081/users/edit', {
                user: editUser,
                user_id,
            })
            .then(res => {
                this.props.verifyCurrentUser();
                this.setState({
                    user: res.data,
                    show: false,
                });
                toast.success('Changement enregistré avec succès');
            })
            .catch(error => {
                console.error(error);
                toast.error('Erreur lors du changement');
            });
    };

    componentDidMount = () => {
        this.setState({ user: this.props.currentUser });
    };

    render() {
        const { user } = this.state;

        return (
            <div className='profile-page'>
                <NavbarApp />

                <Card className='page-header header-filter text-center'>
                    <Container className='main main-raised'>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }}>
                                {user && (
                                    <div className='profile'>
                                        <Card.Img
                                            className='img-raised rounded-circle img-fluid'
                                            src='https://webiconspng.com/wp-content/uploads/2016/11/anonymous_avatar_communication_creative_crime_cyber_hacker_head_human_male_man_person_profile_icon_334588-300x300.png'
                                        />

                                        <Container className='profile-content'>
                                            <Row>
                                                <Col xs={12} md={6} className='padding-xs'>
                                                    <Row>
                                                        <Col md={5} xs={6}>
                                                            Prénom:
                                                        </Col>
                                                        <Col md={7} xs={6}>
                                                            {user.user_firstname}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={5} xs={6}>
                                                            Nom:
                                                        </Col>
                                                        <Col md={7} xs={6}>
                                                            {user.user_lastname}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={5} xs={6}>
                                                            Pseudo:
                                                        </Col>
                                                        <Col md={7} xs={6}>
                                                            {user.user_pseudo}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={5} xs={6}>
                                                            E-mail:
                                                        </Col>
                                                        <Col md={7} xs={6}>
                                                            {user.user_email}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={12} md={6} className='padding-xs'>
                                                    <Card.Text className='description text-center'>
                                                        Petit détail:
                                                        <br />
                                                        {user.user_infos}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <Container className='padding-xs'>
                                            <Button variant='dark' onClick={this.handleShow}>
                                                Modifier le profil
                                            </Button>
                                        </Container>

                                        <Modal
                                            size='lg'
                                            aria-labelledby='contained-modal-title-vcenter'
                                            centered
                                            show={this.state.show}
                                            onHide={this.handleClose}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Vos informations :</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <Form as={Container}>
                                                    <Col
                                                        md={{
                                                            span: 8,
                                                            offset: 2,
                                                        }}
                                                    >
                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                Prénom
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    type='text'
                                                                    defaultValue={user.user_firstname}
                                                                    onChange={e => {
                                                                        this.handleChange({
                                                                            user_firstnameField: e.target.value,
                                                                        });
                                                                    }}
                                                                    placeholder='Prénom'
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                Nom
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    type='text'
                                                                    defaultValue={user.user_lastname}
                                                                    onChange={e => {
                                                                        this.handleChange({
                                                                            user_lastnameField: e.target.value,
                                                                        });
                                                                    }}
                                                                    placeholder='Nom'
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                E-mail
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    type='email'
                                                                    defaultValue={user.user_email}
                                                                    onChange={e => {
                                                                        this.handleChange({
                                                                            user_emailField: e.target.value,
                                                                        });
                                                                    }}
                                                                    placeholder='E-mail'
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                        {/* <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                Mot de passe
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    type='password'
                                                                    defaultValue={user.user_password}
                                                                    onChange={e => {
                                                                        this.handleChange({ user_passwordField: e.target.value });
                                                                    }}
                                                                    placeholder='Mot de passe'
                                                                />
                                                            </Col>
                                                        </Form.Group> */}
                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                Pseudo
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    type='text'
                                                                    defaultValue={user.user_pseudo}
                                                                    onChange={e => {
                                                                        this.handleChange({
                                                                            user_pseudoField: e.target.value,
                                                                        });
                                                                    }}
                                                                    placeholder='Pseudo'
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row}>
                                                            <Form.Label column sm='3'>
                                                                Infos
                                                            </Form.Label>
                                                            <Col sm='9'>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    rows='3'
                                                                    defaultValue={user.user_infos}
                                                                    onChange={e => {
                                                                        this.handleChange({
                                                                            user_infosField: e.target.value,
                                                                        });
                                                                    }}
                                                                    placeholder='Détails'
                                                                />
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                </Form>
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button variant='secondary' onClick={this.handleClose}>
                                                    Fermer
                                                </Button>
                                                <Button variant='primary' onClick={this.editProfil}>
                                                    Enregistrer les changements
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </div>
        );
    }
}
