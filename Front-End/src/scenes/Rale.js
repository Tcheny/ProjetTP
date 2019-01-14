import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

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

const Rale = ({ post }) => {
    const date = moment.utc(post.date_creation).format('DD-MM-YYYY, HH:mm')

    const postMedia = post.type_media === 1 ? <RaleImg post={post} /> : <RaleVideo post={post} />

    return (
        <StyledContainer>
            <StyledBy>
                Par { date }
            </StyledBy>
            <StyledMargin>
                { postMedia }
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
};

export default Rale;
