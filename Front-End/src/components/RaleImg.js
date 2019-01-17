import React, { Component } from 'react';
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

class RaleImg extends Component {
    render () {
        const { postId } = this.props;
        console.log("RALE IMG :", postId)
        // const media = (file) => {
        //     return `mediaUploads/${file.path_media}`
        
    
        return (
            <StyledFlex>
                <StyledImg>
                    {/* <img src={media(postId)} /> */}
                {/* { postId.path_media } */}
                </StyledImg>
            </StyledFlex>
        )
    }
};

export default RaleImg;
