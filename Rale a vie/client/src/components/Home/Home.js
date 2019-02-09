import React, { Fragment, Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import NavbarApp from "../NavbarApp/index";
import Post from "../Post/index";
import DisplayRale from "../DisplayRale/index";
import Search from "../Search/index";
import Header from "../Header/Header";

export default class Home extends Component {
    state = {
        postsId: []
    };

    getAllPostsId = () => {
        axios
            .get("http://localhost:8081/posts/allId")
            .then(res => {
                this.setState({ postsId: res.data });
            })
            .catch(error => {
                console.error(error);
            });
    };

    componentDidMount = () => {
        this.getAllPostsId();
    };

    render() {
        const { isAuth, userId } = this.props;

        const allRales = this.state.postsId.map((postId, index) => {
            return <DisplayRale key={index} postId={postId} userId={userId} />;
        });

        return (
            <Fragment>
                <NavbarApp />
                <Header />
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div style={{ margin: "50px 0" }}>
                                <Search />
                                {isAuth ? (
                                    <Post getAllPostsId={this.getAllPostsId} />
                                ) : (
                                    ""
                                )}
                                {allRales}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
