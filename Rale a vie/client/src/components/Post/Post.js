import React, { Component } from "react";
import axios from "axios";
import { Form, Card, Button, Row } from "react-bootstrap";

export default class Post extends Component {
    state = {
        inputPost: "",
        inputFile: null
    };

    submitForm = () => {
        const formData = new FormData();
        const inputPostValue = this.state.inputPost;

        formData.append("post", inputPostValue);
        formData.append("type_media", 1);
        formData.append("uploadFile", this.state.inputFile);

        axios
            .post("http://localhost:8081/posts/add", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(res => {
                console.log(res.data);
                this.props.getAllPostsId();
                this.setState({ inputPost: "", inputFile: null });
            });
    };

    handleChange = event => {
        this.setState({ inputPost: event.target.value });
    };

    handleChangeFile = event => {
        this.setState({ inputFile: event.target.files[0] });
    };

    render() {
        return (
            <Card>
                <Card.Header>Créer un rale</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                rows="5"
                                placeholder="Ralez plus fort que jamais !"
                                value={this.state.inputPost}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row className="justify-content-around">
                        <Button
                            as="input"
                            type="file"
                            variant="dark"
                            key={this.state.inputPost}
                            name="mediaUpload"
                            onChange={this.handleChangeFile}
                        />

                        <Button
                            as="input"
                            type="submit"
                            variant="dark"
                            value="Envoyer"
                            onClick={this.submitForm}
                        />
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}
