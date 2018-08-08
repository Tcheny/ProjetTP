import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Navbar, Header, Post } from './'

const StyledBody = styled.div`
  width: 60%;
  margin: auto;
`;

const Home = () => {
return (  
  <Fragment>
    <Navbar>
      <Link to='/login'>
        Connexion
      </Link>
    </Navbar>
    <StyledBody>
      <Header />
      <Post />
    </StyledBody>
  </Fragment>
  )
};

export default Home;