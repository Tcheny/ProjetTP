import React from 'react';
import styled from 'styled-components';

import { Search, Select, Button } from './';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
  
  const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;
  
  const StyledTitle = styled.h1`
  padding: 100px 0;
  font-size: 4em;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>
        RALEZ <br/> MAIS FAITES LE BIEN.
      </StyledTitle>
      <StyledFlex>
        <Search />
        <Select />
      </StyledFlex>
      <StyledFlex>
        <Button width="12em" bg="violet" type="button">
          Les plus drôles
        </Button>
        <Button width="12em" type="button">
          Les plus commentés
        </Button>
        <Button width="12em" type="button">
          Les plus énervants
        </Button>
      </StyledFlex>
    </StyledHeader>
  )
};

export default Header;