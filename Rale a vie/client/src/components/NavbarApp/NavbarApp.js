import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import classnames from 'classnames';

class NavbarApp extends Component {
    state = {
        prevScrollpos: window.pageYOffset,
        visible: true,
    };

    endSession = () => {
        this.props.logout();
        
        setTimeout(() => {
            this.props.history.push('/login');
        }, 1000);
    };

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos < 500;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible,
        });
    };

    render() {
        const { isAuth, match } = this.props;

        const isMain =
            match.url === '/' ? (
                <LinkContainer to='/about'>
                    <NavDropdown.Item>
                        <i className='nav-item fas fa-cog' />
                        Mon Profil
                    </NavDropdown.Item>
                </LinkContainer>
            ) : (
                <LinkContainer to='/'>
                    <NavDropdown.Item>
                        <i className='nav-item fas fa-home' />
                        Home
                    </NavDropdown.Item>
                </LinkContainer>
            );

        return (
            <Navbar
                expand='lg'
                bg='dark'
                variant='dark'
                fixed='top'
                className={classnames('navbar-default', {
                    'navbar-hidden': !this.state.visible,
                })}
            >
                <Navbar.Brand href='/'>Rale à vie</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
                    {isAuth ? (
                        <NavDropdown alignRight title='Profil' id='collasible-nav-dropdown'>
                            {isMain}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.endSession}>
                                <i className='nav-item fas fa-sign-out-alt' />
                                Déconnexion
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className=' nav-item fas fa-user' />
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
