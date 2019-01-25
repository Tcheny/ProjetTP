import React, { Component, Fragment } from "react";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";

import { Navbar, Button } from "../components";
import axios from "axios";

const StyledForm = styled.form`
    width: 50%;
    margin: 0 auto;
`;

const StyledContainButton = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    width: 30%;
    margin: 10px auto;
    background: linear-gradient(
        to bottom,
        rgba(47, 95, 109, 1) 25%,
        rgba(26, 46, 56, 1) 69%
    );
    color: #fff;
`;

class Login extends Component {
    state = {
        user_email: "",
        user_password: "",
        redirect: false
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            user_email: this.state.user_email,
            user_password: this.state.user_password
        };

        axios
            .post("http://localhost:8081/login", { user })
            .then(res => {
                console.log(res);
                this.setState({ redirect: true });
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <Fragment>
                <Navbar>
                    <NavLink to="/">Accueil</NavLink>
                </Navbar>

                <StyledForm onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Adresse mail"
                                onChange={e =>
                                    this.setState({
                                        user_email: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                            Mot de passe
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Entrez un mot de passe"
                                onChange={e =>
                                    this.setState({
                                        user_password: e.target.value
                                    })
                                }
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
                            Se connecter
                        </Button>
                        <StyledNavLink className="btn" to="/subcription">
                            S'inscrire
                        </StyledNavLink>
                    </StyledContainButton>
                </StyledForm>
            </Fragment>
        );
    }
}

export default Login;
