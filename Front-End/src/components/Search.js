import React from 'react';
import styled from 'styled-components';

const StyledSearch = styled.div`
  display: flex;
  width: 25%;
  height: 38px;
`;

const Search = () => {
  return (
    <StyledSearch>
      <input className="form-control" type="search"   placeholder="Recherche..."/>
      <button className="btn btn-primary" type="submit">OK</button>
    </StyledSearch>
  )
};

export default Search;