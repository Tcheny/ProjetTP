import React from 'react';
import styled from 'styled-components';

import Select from './Select';
import Search from './Search';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledTitle = styled.h1`
  font-size: 4em;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>RALEZ <br/> MAIS FAITES LE BIEN.</StyledTitle>
      <StyledInput>
        <Search />
        <Select />
      </StyledInput>
    </StyledHeader>
  )
};

export default Header;