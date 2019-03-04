import React, { Fragment, Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import NavbarApp from '../NavbarApp/index';
import Post from '../Post/index';
import DisplayRale from '../DisplayRale/index';
import Search from '../Search/index';
import Header from '../Header/Header';

export default class Home extends Component {
    myRef = React.createRef();

    scrolling = () => {
        this.myRef.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // display all Posts
    componentDidMount = () => {
        this.props.getAllPostsId();
    };

    render() {
        const { isAuth, posts_id } = this.props;
        
        const allRales = posts_id.map((postInfos) => {
            return <DisplayRale 
                key={postInfos.post_id}
                userId={postInfos.user_id}
                postId={postInfos.post_id}
                />;
        });

        return (
            <Fragment>
                <NavbarApp />
                <Header scrolling={this.scrolling} />
                <i class="fas fa-arrow-circle-up fa-3x" onClick={this.scrolling} />
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div
                                style={{ margin: '100px 0' }}
                                ref={r => (this.myRef = r)}
                            >
                                <Search />
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
