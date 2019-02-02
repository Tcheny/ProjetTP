import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class Post extends Component {
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
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Créer un rale</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        placeholder="Ralez plus fort que jamais !"
                        value={this.state.inputPost}
                        onChange={this.handleChange}
                    />
                    <Button
                        as="input"
                        type="file"
                        key={this.state.inputPost}
                        name="mediaUpload"
                        onChange={this.handleChangeFile}
                    />

                    <Button
                        as="input"
                        type="submit"
                        value="Envoyer"
                        onClick={this.submitForm}
                    />
                </Form.Group>
            </Form>
        );

        // <div>
        //     {/* <StyledForm enctype="multipart/form-data"> */}
        //     <textarea
        //         placeholder="Ralez plus fort que jamais!"
        //         value={this.state.inputPost}
        //         onChange={this.handleChange}
        //     />
        //     <div>
        //         {/* <StyledUpload> */}
        //         {/* <Button width="10em">
        //                 <i className="fas fa-upload"></i> Photo
        //             </Button> */}
        //         <input
        //             type="file"
        //             key={this.state.inputPost}
        //             name="mediaUpload"
        //             onChange={this.handleChangeFile}
        //         />
        //         {/* </StyledUpload> */}
        //         <button onClick={this.submitForm}>Envoyer</button>
        //     </div>
        //     {/* </StyledForm> */}
        // </div>
    }
}

export default Post;
