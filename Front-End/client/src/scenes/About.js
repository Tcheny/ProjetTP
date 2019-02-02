import React, { Component } from "react";

export default class About extends Component {
    getUserId = () => {
        axios
            .get("http://localhost:8081/users/", {
                params: { id: this.props.postId.post_id }
            })
            .then(res => {
                this.setState({
                    postsId: res.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
    render() {
        return <div> ABOUT </div>;
    }
}
