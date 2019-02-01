import React, { Component } from 'react';


// const StyledFlex = styled.div`
//     display: flex;
// `;

// const StyledImg = styled.div`
//     width: 500px;
//     height: 667px;
//     border: 1px solid grey;
//     border-radius: 10px;
// `;

// const ImgFile = styled.img`
//     object-fit: contain;
//     width: 100%;
//     height: 100%;
    /* height: 100%;
    min-height: initial;
    width: auto; */
// `;

class RaleImg extends Component {


    render () {
        const { imgUrl } = this.props;
        
        return (
            <div>
                <div>
                    <img src={imgUrl} />
                </div>
            </div>
        )
    }
};

export default RaleImg;
