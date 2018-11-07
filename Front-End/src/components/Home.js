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
    state = {
      users: [],
      posts: [],
      comments: []
    }

  componentDidMount = () => {
    axios
      .all([
        axios.get('/users'),
        axios.get('/posts'),
        axios.get('/comments'),
      ])
      .then(axios.spread(( user, post, comment ) => {
        this.setState({
          users: user.data,
          posts: post.data,
          comments: comment.data
        })
      }))
      .catch(error => (error))
  };

  
  render () {
    const allPosts = this.state.posts.map( post => {
      return <Rale key={post.post_id} post={post} />
    });

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
          { allPosts }
        </StyledBody>
      </Fragment>
    )
  }
};

export default Home;