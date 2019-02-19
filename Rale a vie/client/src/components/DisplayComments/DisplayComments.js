import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { InputGroup, Row, Form, Card, Button } from "react-bootstrap";

export default class submitForm extends Component {
    state = {
        commentsToDisplay: [],
        comment: ""
    };

    submitForm = event => {
        event.preventDefault();

        const comment = {
            user_id: this.props.currentUser && this.props.currentUser.user_id,
            post_id: this.props.postId.post_id,
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
                    comment: "",
                    commentsToDisplay: updatedCommentsToDisplay
                });
            });
    };

    render() {
        const commentsList = this.state.commentsToDisplay.map(comment => {
            return (
                <div key={comment.comment_id}>
                    <div> {comment.date_creation}</div>
                    <div> {comment.comment}</div>
                    <div> {comment.user_pseudo}</div>
                </div>
            );
        });

        return (
            <div style={{ margin: "30px 0" }}>
                <hr />
                <div>
                    <p>les commentaires:</p>
                    <div>{commentsList}</div>
                </div>

                <hr />
                <Form onSubmit={this.submitForm}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            type="text"
                            placeholder="Commentez ce rale"
                            onChange={e =>
                                this.setState({
                                    comment: e.target.value
                                })
                            }
                        />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
