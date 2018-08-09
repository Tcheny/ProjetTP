import React from 'react';
import styled from 'styled-components';

import { Button, RaleImg, RaleVideo } from './';

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

const Rale = () => {
  const raleImg = <RaleImg />
  const raleVIdeo = <RaleVideo />

  return (
    <StyledContainer>
      <StyledBy>
        Par "data.name", "moment" + "heure"
      </StyledBy>
      <StyledMargin>
        <RaleImg />
        <hr/>
        <StyledPost>
          <Button
            type="submit"
            width="10em"
          >
            Mais graavee
          </Button>
          <div>"count"</div>
          <Button
            type="submit"
            width="10em"
          >
            Oh merde
          </Button>
          <div>"count"</div>
          <Button
            type="submit"
            width="10em"
          >
            Ralez
          </Button>
          <div>"count"</div>
        </StyledPost>
        <StyledFlex>
          <StyledMargin>emoji</StyledMargin>
          <StyledMargin>emoji</StyledMargin>
          <StyledMargin>emoji</StyledMargin>
        </StyledFlex>
      </StyledMargin>
    </StyledContainer>
  )
};

export default Rale;