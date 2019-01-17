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
        postsId: [],
    }

    getAllPostsId = () => {
        const result = axios.get('/posts/allId')
        .then(res => {
            this.setState({postsId: res.data})
        })
    }

    componentDidMount = () => {
        this.getAllPostsId()
    };


    render () {
        const allPosts = this.state.postsId.map((id, index) => {
            return <Rale key={index} postId={id} />
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
                    <Post getAllPostsId={this.getAllPostsId}/>
                    { allPosts }
                </StyledBody>
            </Fragment>
        )
    }
};

export default Home;
