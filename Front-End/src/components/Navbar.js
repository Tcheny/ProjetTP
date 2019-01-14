import React from 'react';
import styled from 'styled-components';

import schtroumpf from '../images/Schtroumpf-2.png';

const StyledNav = styled.nav`
    width: 100%;
    margin: auto;
    padding: 1rem 5rem;

    @media (max-width:767px) {
        padding: 1rem;
    }
`;

const Header = styled.header`
    width: 100%;
    margin: auto;
    padding: 1rem 5rem;

    @media (max-width:767px) {
        width: 90%;
        padding: 1rem;
        font-size: 20px;
    }
`;

const StyledTitle = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    font-size: 4em;

    @media (max-width:767px) {
        font-size: 2em;
    }
`;

const Navbar = ({ children }) => (
    <Header>
        <StyledNav className="navbar navbar-light bg-white fixed-top justify-content-between">
            <a className="navbar-brand">Rale à vie</a>
            {children}
        </StyledNav>
        <StyledTitle>
            RALEZ <br /> MAIS FAITES LE BIEN.
            <img src={schtroumpf} />
        </StyledTitle>
    </Header>
);

export default Navbar;
