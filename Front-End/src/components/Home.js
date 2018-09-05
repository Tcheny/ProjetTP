import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Navbar, Header, Post, Rale } from './'

const StyledBody = styled.div`
  width: 60%;
  margin: auto;
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios
      .get('/posts')
      .then(res => res.data)
      .then(data => this.setState({ data }))
      .catch(error => (error))
  }

  render () {
    const posts = this.state.data.map( post => post);
    return (  
      <Fragment>
        <Navbar>
          <Link to='/login'>
            Connexion
          </Link>
        </Navbar>
        <StyledBody>
          <Header />
          <Post/>
          <Rale posts={posts} />
        </StyledBody>
      </Fragment>
    )
  }
};

export default Home;