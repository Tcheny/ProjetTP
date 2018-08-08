import React from 'react';
import styled from 'styled-components';

const StyledFrom = styled.form`
    width: 50%;
    margin : auto;
`;

const StyledContainButton = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 30%;
  margin: 10px auto;
`;

const Login = () => {
  return (
    <StyledFrom>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Nom</label>
        <div class="col-sm-10">
          <input type="text" className="form-control" placeholder="Entrez un nom" />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" className="form-control" placeholder="Entrez un e-mail" />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Mot de passe</label>
        <div class="col-sm-10">
          <input type="password" className="form-control" placeholder="Entrez un mot de passe" />
        </div>
      </div>
      <StyledContainButton>
        <StyledButton type="submit" className="btn btn-primary">S'inscrire</StyledButton>
        <StyledButton type="submit" className="btn btn-primary">Se connecter</StyledButton>
      </StyledContainButton> 
  </StyledFrom>
   )
};

export default Login;