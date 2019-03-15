import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Col, Card, Button, Form } from 'react-bootstrap';

class Subcribe extends Component {
    state = {
        user: {
            lastname: '',
            firstname: '',
            email: '',
            password: '',
            pseudo: '',
        },
    };

    handleSubmit = async event => {
        event.preventDefault();

        const user = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            password: this.state.password,
            pseudo: this.state.pseudo,
            type: 'user',
            infos: `Bonjour, ici c'est ${this.state.pseudo} !`,
        };

        try {
            await axios.post('http://localhost:8081/users/add', { user });
            this.props.verifyCurrentUser();
            this.props.history.push('/');
            toast.info(`Bienvenue ${user.pseudo}!`);
        } catch (error) {
            console.error(error);
            toast.error(error.request.response.replace(/"/g, ''));
        }
    };

    render() {
        return (
            <Card className='wrapper'>
                <Card.Body className='fadeInDown'>
                    <Col md={8} className='formContent'>
                        <Card.Title className='fadeIn first'>
                            <h1 className='title'>S'inscrire</h1>
                        </Card.Title>

                        <Form onSubmit={this.handleSubmit} >
                            <input
                                type='text'
                                className='input-text fadeIn second'
                                placeholder='Nom'
                                onChange={e => this.setState({ lastname: e.target.value })}
                            /><span className='redText fadeIn second'>*</span>
                            <input
                                type='text'
                                className='input-text fadeIn second'
                                placeholder='Prénom'
                                onChange={e => this.setState({ firstname: e.target.value })}
                            /><span className='redText fadeIn second'>*</span>
                            <input
                                type='email'
                                className='input-text fadeIn third'
                                placeholder='e-mail'
                                onChange={e => this.setState({ email: e.target.value })}
                            /><span className='redText fadeIn third'>*</span>
                            <input
                                type='password'
                                className='input-text fadeIn third'
                                placeholder='password'
                                onChange={e => this.setState({ password: e.target.value })}
                            /><span className='redText fadeIn third'>*</span>
                            <input
                                type='text'
                                className='input-text fadeIn fourth'
                                placeholder='Pseudo'
                                onChange={e => this.setState({ pseudo: e.target.value })}
                            /><span className='redText fadeIn fourth'>*</span>
                            <Button
                                type='submit'
                                className='input-button fadeIn fifth'
                                onSubmit={this.handleSubmit}
                            >
                                SE CONNECTER
                            </Button>
                        </Form>

                        <NavLink className='a underlineHover' to={'/'}>
                            <div className='formFooter'>Rale à vie</div>
                        </NavLink>
                    </Col>
                </Card.Body>
                <div className='fadeIn fifth redText'>* Champs obligatoire</div>
            </Card>
        );
    }
}

export default withRouter(Subcribe);
