import React, { Fragment, Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { Navbar, Search } from "../components";
import { Post, Rale } from "./index";

class Home extends Component {
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
        const { currentUser, userId } = this.props;

        const allRales = this.state.postsId.map((postId, index) => {
            return <Rale key={index} postId={postId} userId={userId} />;
        });

        const post = () => {
            if (currentUser) {
                return <Post getAllPostsId={this.getAllPostsId} />;
            }
        };

        return (
            <Fragment>
                <Navbar currentUser={currentUser} />
                <div className="main-background">
                    <h1 className="main-title">
                        RALEZ <br /> MAIS FAITES LE BIEN.
                    </h1>
                    <a className="js-scrollTo" href="#page-1">
                        <i className="fa fa-arrow-circle-down fa-4x" />
                    </a>
                </div>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div id="page-1" style={{ margin: "50px 0" }}>
                                <Search />
                                {post()}
                                {allRales}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Home;
