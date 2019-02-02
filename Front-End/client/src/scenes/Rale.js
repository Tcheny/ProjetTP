import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

class Rale extends Component {
    state = {
        post: null,
        imgUrl: ""
    };

    getPostInfosById = () => {
        axios
            .get("http://localhost:8081/posts/postInfos", {
                params: { id: this.props.postId.post_id }
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

    updateImgContent = () => {
        if (this.props.file) {
            this.setState({ imgUrl: imgUrl });
        }
    };

    componentDidMount = () => {
        this.getPostInfosById();
    };

    render() {
        const { postId } = this.props;

        let date = "";
        let imgUrl = "";
        let postText = "";
        let author = "";

        if (this.state.post) {
            date = moment
                .utc(this.state.post.date_creation)
                .format("DD-MM-YYYY, HH:mm");

            imgUrl = this.state.imgUrl;
            author = this.state.post.user_pseudo;
            postText = this.state.post.post;
        }

        return (
            <div style={{ margin: "30px 0" }}>
                <Card>
                    <Card.Header>
                        Par {author}, le {date}
                    </Card.Header>
                    <Card.Img variant="top" src={imgUrl} />
                    <Card.Body>
                        <Card.Text>{postText}</Card.Text>
                        <Button variant="outline-success">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer
                        className="text-muted"
                        style={{ display: "flex" }}
                    >
                        <div> 😡 (count) </div>
                        <div> 😂 (count) </div>
                        <div> 😱 (count) </div>
                    </Card.Footer>
                </Card>
            </div>
        );

        // <div>
        //     <div>
        //         Par {author}, {date}
        //     </div>
        //     <div>
        //         {postMedia}
        //         {postText}
        //         <hr />
        //         <div>
        //             <Button type="submit" width="10em">
        //                 Mais graavee
        //             </Button>
        //             <div>"count"</div>
        //             <Button type="submit" width="10em">
        //                 Oh merde
        //             </Button>
        //             <div>"count"</div>
        //             <Button type="submit" width="10em">
        //                 Ralez
        //             </Button>
        //             <div>"count"</div>
        //         </div>
        //         <div>
        //             <div> 😡 (count) </div>
        //             <div> 😂 (count) </div>
        //             <div> 😱 (count) </div>
        //         </div>
        //     </div>
        // </div>
    }
}

export default Rale;
