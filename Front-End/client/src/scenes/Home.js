import React, { Fragment, Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { Navbar, Search } from "../components";
import { Header, Post, Rale } from "./index";

class Home extends Component {
    state = {
        postsId: []
        // currentUser: null
    };

    // verifyCurrentUser = () => {
    //     axios
    //         .get("http://localhost:8081/auth")
    //         .then(res => {
    //             console.log(res);
    //             this.setState({ currentUser: res.data.user });
    //         })
    //         .catch(error => {
    //             console.error(error.response);
    //             this.setState({ currentUser: error.response.data.user });
    //         });
    // };

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
        // this.verifyCurrentUser();
        this.getAllPostsId();
    };

    render() {
        const { user } = this.props;

        const allRales = this.state.postsId.map((id, index) => {
            return <Rale key={index} postId={id} />;
        });

        // console.log("USER", this.props.user);

        const post = () => {
            if (this.state.currentUser) {
                return <Post getAllPostsId={this.getAllPostsId} />;
            }
        };

        return (
            <Fragment>
                <Navbar currentUser={user} />
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
