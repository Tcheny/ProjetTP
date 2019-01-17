import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

import { Button, RaleImg, RaleVideo } from '../components';
// import angry from '../images/angry-2.png';
// import crying from '../images/crying.png';
// import shocked from '../images/shocked.png';

const StyledContainer = styled.div`
    background-color: #f0f5f5;
    border: 1px solid #e0ebeb;
    border-radius: 4px;
    margin: 30px 0;
`;

const StyledBy = styled.div`
    margin: 5px 10px;
`;

const StyledMargin = styled.div`
     margin: 20px;
`;

const StyledPost = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledFlex = styled.div`
     display: flex;
`;

const StyledImg = styled.div`
    width: 40%;
    height: 150px;
    margin-right: 50px;
    border: 1px solid #000;
`;

class Rale extends Component {
    state = {
        post: null
    }

    getPostInfosById = () => {
        axios.get('/posts/postInfos', { params: { id: this.props.postId.post_id}})
        .then(res => {
            this.setState({ post: res.data })
        })
        .catch(error => {
            console.error(error)
        })
    }

    componentDidMount = () => {
        this.getPostInfosById()
    }

    render () {
        const { postId } = this.props;
        
        
        let date = '';
        let postMedia = '';
        let postText= '';
        let author = '';
        
        if (this.state.post) {
                date = moment.utc(this.state.post.date_media).format('DD-MM-YYYY, HH:mm')

                postMedia = this.state.post.type_media === 1 && <RaleImg postId={postId} />

                author= this.state.post.user_pseudo
                postText = this.state.post.post
            }


            return (
                <StyledContainer>
                    <StyledBy>
                        Par {author}, { date }
                    </StyledBy>
                    <StyledMargin>
                        { postMedia }
                        { postText }
                        <hr/>
                    <StyledPost>
                        <Button type="submit" width="10em">
                            Mais graavee
                        </Button>
                        <div>"count"</div>
                        <Button type="submit" width="10em">
                            Oh merde
                        </Button>
                        <div>"count"</div>
                        <Button type="submit" width="10em">
                            Ralez
                        </Button>
                        <div>"count"</div>
                    </StyledPost>
                        <StyledFlex>
                            <StyledMargin> 😡 (count) </StyledMargin>
                            <StyledMargin> 😂 (count) </StyledMargin>
                            <StyledMargin> 😱 (count) </StyledMargin>
                        </StyledFlex>
                    </StyledMargin>
                </StyledContainer>
            )


        return (
            <div>{post}</div>
        )
    }
};

export default Rale;
