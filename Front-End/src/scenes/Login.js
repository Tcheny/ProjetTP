import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar, Button } from '../components';

const StyledForm = styled.form`
    width: 50%;
    margin : 0 auto;
`;

const StyledContainButton = styled.div`
    display: flex;
    flex-direction: column;
`;

const Login = () => {
    return (
        <Fragment>
            <Navbar>
                <NavLink to='/'>
                Accueil
                </NavLink>
            </Navbar>
            
            <StyledForm>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Nom</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Entrez un nom" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Entrez un e-mail" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Mot de passe</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Entrez un mot de passe" />
                    </div>
                </div>
                <StyledContainButton>
                    <Button type="submit" width="30%" m="10px auto">
                        S'inscrire
                    </Button>
                    <Button type="submit" width="30%" m="10px auto">
                        Se connecter
                    </Button>
                </StyledContainButton> 
            </StyledForm>
        </Fragment>
    )
};

export default Login;