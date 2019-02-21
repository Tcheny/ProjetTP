import React, { Fragment, Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import NavbarApp from "../NavbarApp/index";
import Post from "../Post/index";
import DisplayRale from "../DisplayRale/index";
import Search from "../Search/index";
import Header from "../Header/Header";

export default class Home extends Component {
    // state = {
    //     postsId: []
    // };

    myRef = React.createRef();

    scrolling = () => {
        this.myRef.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    // getAllPostsId = () => {
    //     axios
    //         .get("http://localhost:8081/posts/allId")
    //         .then(res => {
    //             this.setState({ postsId: res.data });
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    componentDidMount = () => {
        this.props.getAllPostsId();
    };

    render() {
        const { isAuth, getAllPostsId, posts_id } = this.props;

        const allRales = posts_id.map((posts, index) => {
            return <DisplayRale key={index} posts={posts} />;
        });

        return (
            <Fragment>
                <NavbarApp />
                <Header scrolling={this.scrolling} />
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div
                                style={{ margin: "100px 0" }}
                                ref={r => (this.myRef = r)}
                            >
                                <Search />
                                {isAuth ? (
                                    <Post getAllPostsId={getAllPostsId} />
                                ) : (
                                    ""
                                )}
                                {allRales}
                                {/* <DisplayRale /> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
