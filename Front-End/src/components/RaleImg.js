import React from 'react';
import styled from 'styled-components';

const StyledFlex = styled.div`
    display: flex;
`;

const StyledImg = styled.div`
    width: 40%;
    height: 150px;
    margin-right: 50px;
    border: 1px solid #000;
`;

const RaleImg = ({ post }) => {
    return (
        <StyledFlex>
            <StyledImg>{ post.path_media }</StyledImg>
            <div>{ post.post }</div>
        </StyledFlex>
    )
};

export default RaleImg;