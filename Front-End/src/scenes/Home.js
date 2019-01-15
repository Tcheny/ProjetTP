import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Navbar } from '../components'
import { Header, Post, Rale} from './index'

const StyledBody = styled.div`
    width: 60%;
    margin: auto;

    @media (max-width:767px) {
        width: 90%
    }
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
            axios.get('/users/all'),
            axios.get('/posts/all'),
            axios.get('/comments/all'),
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
                    <NavLink to='/login'>
                        Connexion
                    </NavLink>
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
