import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    fetch("/all")
      .then(res => res.json())
      .then(data => this.setState({data}))
      .catch(error => (error))
  }
  render () {
    return (  
      <Fragment>
        <Navbar>
          <Link to='/login'>
            Connexion
          </Link>
        </Navbar>
        <StyledBody>
          <Header />
          {this.state.data.map( users => {
            <div key={users.user_id}>{users.user_firstname}</div>
          })}
          <Post />
          <Rale />
        </StyledBody>
      </Fragment>
      )
  }
};

export default Home;