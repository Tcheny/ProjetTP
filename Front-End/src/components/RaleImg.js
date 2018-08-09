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

const RaleImg = () => {
  return (
    <StyledFlex>
          <StyledImg>"Image"</StyledImg>
          <div>"Post de rale"</div>
        </StyledFlex>
  )
};

export default RaleImg;