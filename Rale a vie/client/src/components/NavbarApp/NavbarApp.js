import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default class NavbarApp extends Component {
    render() {
        const { isAuth, logout } = this.props;
        return (
            <Navbar
                bg="dark"
                variant="dark"
                className="navbar navbar-default"
                sticky="top"
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
                            <NavDropdown.Item href="#/about">
                                <i className="fa fa-user" />
                                My Profil
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#/user/edit">
                                <i className="fa fa-gear" />
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={logout}>
                                <i className="fa fa-user" />
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link href="#/login">
                            <i className="fa fa-user" /> Login
                        </Nav.Link>
                    )}
                    ;
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
