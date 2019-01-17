import React from 'react';
import styled from 'styled-components';

import { Search, Button } from '../components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
  
const StyledFlex = styled.div`
    display: flex;
    justify-content: ${props => props.button ? 'space-around' : 'space-between'};
    width: 100%;
    margin-bottom: 20px;
`;

const Header = () => {
    return (
        <StyledHeader>
            <StyledFlex>
                <Search />
            </StyledFlex>
            <StyledFlex button>
                <Button width='12em' violet type='button'>
                    Les plus drôles
                </Button>
                <Button width='12em' green type='button'>
                    Les plus commentés
                </Button>
            </StyledFlex>
        </StyledHeader>
    )
};

export default Header;