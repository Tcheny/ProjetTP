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

const imgFile = styled.img`
    width: 100px;
    height: 100px;
`;

class RaleImg extends Component {


    render () {
        const { imgUrl } = this.props;
        
        return (
            <StyledFlex>
                <StyledImg>
                    <img src={imgUrl} style={{width: "100px", height: "100px"}} />
                </StyledImg>
            </StyledFlex>
        )
    }
};

export default RaleImg;
