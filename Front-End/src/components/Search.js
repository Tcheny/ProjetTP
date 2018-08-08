import React from 'react';
import styled from 'styled-components';

import { Button } from './';

const StyledSearch = styled.div`
  display: flex;
  width: 35%;
  height: 38px;
`;

const Search = () => {
  return (
    <StyledSearch>
      <input
        className="form-control"
        type="search"
        placeholder="Recherche..." />
      <Button
        type="submit"
        width="25%"
        m="0 20px"
        >
        Ok
      </Button>
    </StyledSearch>
  )
};

export default Search;