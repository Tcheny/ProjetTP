import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class NavbarApp extends Component {
    render() {
        const { isAuth, logout } = this.props;
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
                            <LinkContainer to="/about">
                                <NavDropdown.Item>
                                    <i className="nav-item fas fa-cog" />
                                    My Profil
                                </NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                <i className="nav-item fas fa-user-ninja" />
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <i className=" nav-item fas fa-user" />
                                Login
                            </Nav.Link>
                        </LinkContainer>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
