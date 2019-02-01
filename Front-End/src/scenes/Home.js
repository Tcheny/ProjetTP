import React, { Fragment, Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { Navbar } from "../components";
import { Header, Post, Rale } from "./index";
import schtroumpf from "../images/strom.jpg";

class Home extends Component {
    state = {
        postsId: [],
        currentUser: null
    };

    verifyCurrentUser = () => {
        axios
            .get("http://localhost:8081/auth")
            .then(res => {
                console.log(res);
                this.setState({ currentUser: res.data.user });
            })
            .catch(error => {
                console.error(error);
            });
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
        this.verifyCurrentUser();
        this.getAllPostsId();
    };

    render() {
        const allPosts = this.state.postsId.map((id, index) => {
            return <Rale key={index} postId={id} />;
        });

        return (
            <Fragment>
                <Navbar currentUser={this.state.currentUser} />
                <div style={{ width: "100%" }}>
                    <img style={{ width: "100%" }} src={schtroumpf} />
                    <h1>
                        RALEZ <br /> MAIS FAITES LE BIEN.
                    </h1>
                </div>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <div>
                                <Header />
                                <Post getAllPostsId={this.getAllPostsId} />
                                {allPosts}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Home;
