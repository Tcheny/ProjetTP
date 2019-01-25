import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

import { Button } from "../components";

const StyledContainer = styled.div`
    background-color: #f0f5f5;
    border: 1px solid #e0ebeb;
    border-radius: 4px;
`;

const StyledForm = styled.form`
    margin: 20px;
`;

const StyledPost = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StyledUpload = styled.div`
    position: relative;
    overflow: hidden;
`;

const StyledInput = styled.input`
    /* font-size: 100px; */
    /* position: absolute; */
    /* left: 0;
    top: 0;
    opacity: 0; */
`;

class Post extends Component {
    state = {
        inputPost: "",
        inputFile: null
    };
    submitForm = () => {
        const formData = new FormData();
        const inputPostValue = this.state.inputPost;

        formData.append("post", inputPostValue);
        // type_media = 1 (type image)
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
            <StyledContainer>
                {/* <StyledForm enctype="multipart/form-data"> */}
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ralez plus fort que jamais!"
                    value={this.state.inputPost}
                    onChange={this.handleChange}
                />
                <StyledPost>
                    {/* <StyledUpload> */}
                    {/* <Button width="10em">
                            <i className="fas fa-upload"></i> Photo
                        </Button> */}
                    <StyledInput
                        type="file"
                        key={this.state.inputPost}
                        name="mediaUpload"
                        onChange={this.handleChangeFile}
                    />
                    {/* </StyledUpload> */}
                    <button onClick={this.submitForm}>Envoyer</button>
                </StyledPost>
                {/* </StyledForm> */}
            </StyledContainer>
        );
    }
}

export default Post;
