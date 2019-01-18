import React, { Component, Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar, Button } from '../components';
import axios from 'axios';

const StyledForm = styled.form`
    width: 50%;
    margin : 0 auto;
`;

const StyledContainButton = styled.div`
    display: flex;
    flex-direction: column;
`;

class Subcribe extends Component {
    state = {
        user : {
            user_lastname: '',
            user_firstname: '',
            user_email: '',
            user_password: '',
            user_pseudo: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            user_lastname: this.state.user_lastname,
            user_firstname: this.state.user_firstname,
            user_email: this.state.user_email,
            user_password: this.state.user_password,
            user_pseudo: this.state.user_pseudo,
            user_type: 'user'
        }

        axios.post('/users/add', { user })
            .then(res => {
                console.log(res);
                this.setState({ redirect: true })
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                <Navbar>
                    <NavLink to='/'>
                        Accueil
                    </NavLink>
                </Navbar>

                <StyledForm onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nom</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entre ton nom"
                                onChange={(e) => this.setState({ user_lastname: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Prénom</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entre ton prénom"
                                onChange={(e) => this.setState({ user_firstname: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Adresse mail"
                                onChange={(e) => this.setState({ user_email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Mot de passe</label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Entrez un mot de passe"
                                onChange={(e) => this.setState({ user_password: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Pseudo</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entre un pseudo"
                                onChange={(e) => this.setState({ user_pseudo: e.target.value })}
                            />
                        </div>
                    </div>
                    <StyledContainButton>
                        <Button
                            type="submit"
                            width="30%"
                            m="10px auto"
                            onSubmit={this.handleSubmit}
                        >
                            S'inscrire
                        </Button>
                    </StyledContainButton>
                </StyledForm>
            </Fragment>
        )
    }
};

export default Subcribe;
