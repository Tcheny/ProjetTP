import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class NavbarStyle extends Component {
    endSession = () => {
        axios
            .get("http://localhost:8081/logout")
            .then(res => {
                console.log("logout: ", res);
                this.props.history.push("/login");
            })
            .catch(error => {
                console.error(error);
            });
    };
    render() {
        const { currentUser } = this.props;

        const isAuth = () => {
            if (currentUser === null || currentUser === undefined) {
                return (
                    <Nav.Link href="#/login">
                        <i className="fa fa-user" /> Login
                    </Nav.Link>
                );
            } else {
                return (
                    <NavDropdown title="Profil" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#/about">
                            <i className="fa fa-user" />
                            My Profil
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#/user/edit">
                            <i className="fa fa-gear" />
                            Settings
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            href="#/logout"
                            onClick={this.endSession}
                        >
                            <i className="fa fa-user" />
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                );
            }
        };

        return (
            <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">Rale à vie</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav>{isAuth()}</Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavbarStyle);
