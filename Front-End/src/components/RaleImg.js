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
    console.log("POST:", post)
    const media = (file) => {
        return `mediaUploads/${file.path_media}`
    }

    return (
        <StyledFlex>
            <StyledImg>
                <img src={media(post)} />
            { post.path_media }
            </StyledImg>
        </StyledFlex>
    )
};

export default RaleImg;
