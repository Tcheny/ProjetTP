import React, { Component } from "react";
import moment from "moment";
import "moment/locale/fr";
import axios from "axios";
import {
    InputGroup,
    ListGroup,
    Form,
    FormControl,
    Card,
    Button,
    Row
} from "react-bootstrap";

export default class Rale extends Component {
    state = {
        isToggle: false,
        post: null,
        imgUrl: "",
        commentsToDisplay: []
    };

    submitForm = event => {
        event.preventDefault();

        const comment = {
            user_id: this.props.currentUser && this.props.currentUser.user_id,
            post_id: this.props.posts.post_id,
            comment: this.state.comment
        };

        axios
            .post("http://localhost:8081/comments/add", { comment })
            .then(res => {
                console.log(res.data);
                const updatedCommentsToDisplay = this.state.commentsToDisplay.concat(
                    res.data
                );
                this.setState({
                    commentsToDisplay: updatedCommentsToDisplay
                });
            });
    };

    getPostInfosById = () => {
        axios
            .get("http://localhost:8081/posts/postInfos", {
                params: { id: this.props.posts.post_id }
            })
            .then(res => {
                // transform buffer to 8bits unsign
                const arrayBufferView = new Uint8Array(res.data.file.data);
                // new blob
                const imgBlob = new Blob([arrayBufferView], {
                    type: "image/jpeg"
                });
                const imgUrl = URL.createObjectURL(imgBlob);
                this.setState({ post: res.data, imgUrl: imgUrl });
            })
            .catch(error => {
                console.error(error);
            });
    };

    getAllCommentsByRaleId = () => {
        axios
            .get("http://localhost:8081/posts/comments", {
                params: { id: this.props.posts.post_id }
            })
            .then(res => {
                this.setState(prevState => ({
                    isToggle: !prevState.isToggle,
                    commentsToDisplay: res.data
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };

    deletePostsById = id => {
        axios
            .delete("http://localhost:8081/posts/delete", {
                params: { id: id }
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    posts: this.props.posts.post_id !== id
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    deleteCommentById = id => {
        axios
            .delete("http://localhost:8081/comments/delete", {
                params: { id: id }
            })
            .then(res => {
                console.log(res.data);
                const updatedCommentsDeleted = this.state.commentsToDisplay.filter(
                    comment => {
                        return comment.comment_id !== id;
                    }
                );
                this.setState({
                    commentsToDisplay: updatedCommentsDeleted
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    updateImgContent = () => {
        if (this.props.file) {
            this.setState({ imgUrl: imgUrl });
        }
    };

    componentDidMount = () => {
        this.getPostInfosById();
        this.props.getAllUsersById();
    };

    render() {
        let date = "";
        let heure = "";
        let imgUrl = "";
        let postText = "";
        let author = "";

        if (this.state.post) {
            date = moment.utc(this.state.post.date_creation).format("ll");
            heure = moment
                .utc(this.state.post.date_creation)
                .utcOffset("+0200")
                .format("LT");

            imgUrl = this.state.imgUrl;
            author = this.state.post.user_pseudo;
            postText = this.state.post.post;
        }

        const commentsList = this.state.commentsToDisplay.map(comment => {
            let authorComment = "";
            let dateComment = moment.utc(comment.date_creation).format("ll");
            let heureComment = moment
                .utc(comment.date_creation)
                .utcOffset("+0200")
                .format("LT");

            this.props.users_id.filter(user => {
                if (parseInt(user.user_id) === comment.user_id) {
                    authorComment = user.user_pseudo;
                }
            });

            return (
                <ListGroup.Item
                    key={comment.comment_id}
                    style={{
                        margin: "5px 0",
                        borderRadius: "30px"
                    }}
                >
                    <Row className="justify-content-between align-items-center">
                        <div>
                            {authorComment}, le {dateComment} à {heureComment}
                            <div> {comment.comment}</div>
                        </div>
                        <div>
                            <i
                                className="far fa-trash-alt"
                                onClick={e =>
                                    this.deleteCommentById(comment.comment_id)
                                }
                            />
                            <i className="far fa-heart" />
                        </div>
                    </Row>
                </ListGroup.Item>
            );
        });

        return (
            <div style={{ margin: "30px 0" }}>
                <Card>
                    <Card.Header>
                        <Row className="justify-content-between align-items-center">
                            <div>
                                Par {author}, le {date} à {heure}
                            </div>
                            <i
                                className="far fa-trash-alt"
                                onClick={e =>
                                    this.deletePostsById(
                                        this.props.posts.post_id
                                    )
                                }
                            />
                        </Row>
                    </Card.Header>
                    <Card.Img variant="top" src={imgUrl} />
                    <Card.Body>
                        <Card.Text>{postText}</Card.Text>

                        <div style={{ display: "flex" }}>
                            <div> 😂 (count) </div>
                            <div> 😒 (count) </div>
                            <div> 😡 (count) </div>
                            <div> 😱 (count) </div>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <InputGroup className="justify-content-around">
                            <InputGroup.Prepend>
                                <Button variant="dark">Tu as raison!</Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend>
                                <Button variant="dark">Mouais bof</Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>

                            <InputGroup.Prepend>
                                <Button
                                    variant="dark"
                                    onClick={this.getAllCommentsByRaleId}
                                >
                                    💬
                                </Button>
                                <InputGroup.Text>count</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>

                        <hr />
                        <ListGroup>
                            {this.state.isToggle ? (
                                <div>
                                    les commentaires:
                                    {commentsList}
                                    <hr />
                                </div>
                            ) : (
                                ""
                            )}
                        </ListGroup>

                        <Form onSubmit={this.submitForm}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Commentez ce rale"
                                    onChange={e =>
                                        this.setState({
                                            comment: e.target.value
                                        })
                                    }
                                />
                                <InputGroup.Prepend>
                                    <Button
                                        variant="dark"
                                        onClick={this.submitForm}
                                    >
                                        OK
                                    </Button>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Form>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
