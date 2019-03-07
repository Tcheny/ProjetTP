import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarApp from '../NavbarApp/index';
import Post from '../Post/index';
import DisplayRale from '../DisplayRale/index';
import Header from '../Header/Header';

export default class Home extends Component {
    state = {
        prevScrollpos: window.pageYOffset,
        visible: true,
    };

    myRef = React.createRef();

    scrolling = () => {
        this.myRef.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    // Affiche tous les Rales
    componentDidMount = () => {
        this.props.getAllRalesId();
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos < 300;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible,
        });
    };

    render() {
        const { isAuth, posts_id } = this.props;

        const allRales = posts_id.map(postInfos => {
            return <DisplayRale key={postInfos.post_id} userId={postInfos.user_id} postId={postInfos.post_id} />;
        });

        return (
            <Fragment>
                <NavbarApp />

                <Header scrolling={this.scrolling} />

                {!this.state.visible && <i class='fas fa-arrow-circle-up fa-3x' onClick={this.scrolling} />}

                <Container>
                    <Row className='justify-content-md-center'>
                        <Col lg={6} md={8}>
                            <div style={{ margin: '50px 0' }} ref={r => (this.myRef = r)}>
                                {isAuth && <Post />}

                                {allRales}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
