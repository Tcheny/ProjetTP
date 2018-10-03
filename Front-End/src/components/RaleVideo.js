import React from 'react';
import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBorder = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;

const StyledVideo = styled.div`
  border: 1px solid #000;
  height: 250px;
  width: 60%;
`;

const RaleVideo = ({ post }) => {
  return (
    <StyledFlex>
          <StyledBorder>
            <StyledVideo>{ post.path_media }</StyledVideo>
          </StyledBorder>
          <div>{ post.post }</div>
        </StyledFlex>
  )
};

export default RaleVideo;