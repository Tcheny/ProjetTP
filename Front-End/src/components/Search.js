import React from 'react';
import styled from 'styled-components';

import { Button } from './';

const StyledSearch = styled.div`
    display: flex;
    width: 40%;
`;

const Search = () => {
    return (
        <StyledSearch>
            <input className="form-control"
                type="search"
                placeholder="Recherche..." />
            <Button type="submit" width="50px" m="0 20px">
                Ok
            </Button>
        </StyledSearch>
    )
};

export default Search;