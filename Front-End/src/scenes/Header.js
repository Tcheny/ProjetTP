import React from 'react';

import { Search, Button } from '../components';

// const StyledHeader = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
// `;
  
// const StyledFlex = styled.div`
//     display: flex;
//     justify-content: ${props => props.button ? 'space-around' : 'space-between'};
//     width: 100%;
//     margin-bottom: 20px;
// `;

const Header = () => {
    return (
        <div>
            <div>
                <Search />
            </div>
            <div >
                <Button type='button'>
                    Les plus drôles
                </Button>
                <Button type='button'>
                    Les plus commentés
                </Button>
            </div>
        </div>
    )
};

export default Header;