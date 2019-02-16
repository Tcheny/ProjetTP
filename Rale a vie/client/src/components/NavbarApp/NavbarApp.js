import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavbarApp extends Component {
    render() {
        const { isAuth, match, logout } = this.props;
        const isMain =
            match.url === "/" ? (
                <LinkContainer to="/about">
                    <NavDropdown.Item>
                        <i className="nav-item fas fa-cog" />
                        Mon Profil
                    </NavDropdown.Item>
                </LinkContainer>
            ) : (
                <LinkContainer to="/">
                    <NavDropdown.Item>
                        <i className="nav-item fas fa-home" />
                        Home
                    </NavDropdown.Item>
                </LinkContainer>
            );
        return (
            <Navbar
                // collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                className="navbar navbar-default"
                fixed="top"
            >
                <Navbar.Brand href="/">Rale à vie</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end"
                >
                    {isAuth ? (
                        <NavDropdown
                            alignRight
                            title="Profil"
                            id="collasible-nav-dropdown"
                        >
                            {isMain}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                <i className="nav-item fas fa-user-ninja" />
                                Déconnexion
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <i className=" nav-item fas fa-user" />
                                Se connecter
                            </Nav.Link>
                        </LinkContainer>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavbarApp);
