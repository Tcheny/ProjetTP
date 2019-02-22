import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Button, Form } from "react-bootstrap";
class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleSubmit = event => {
        event.preventDefault();
        this.login();
    };

    login = async () => {
        await axios
            .post("http://localhost:8081/login", {
                user_email: this.state.email,
                user_password: this.state.password
            })
            .then(res => {
                console.log("Login: ", res.data);
                this.props.verifyCurrentUser();
                this.props.history.push("/");
                toast(`${res.data}!`);
            })
            .catch(error => {
                console.error(error.request.response);
                toast.error(error.request.response.replace(/"/g, ""));
            });
    };

    render() {
        return (
            <Card className="wrapper">
                <Card.Body className="fadeInDown">
                    <div className="formContent">
                        <Card.Title className="fadeIn first">
                            <h1 className="title">Se Connecter</h1>
                        </Card.Title>

                        <Form onSubmit={this.handleSubmit}>
                            <input
                                type="email"
                                className="input-text fadeIn second"
                                placeholder="e-mail"
                                onChange={e =>
                                    this.setState({
                                        email: e.target.value
                                    })
                                }
                            />
                            <input
                                type="password"
                                className="input-text fadeIn third"
                                placeholder="password"
                                onChange={e =>
                                    this.setState({
                                        password: e.target.value
                                    })
                                }
                            />
                            <Button
                                type="submit"
                                className="input-button fadeIn fourth"
                                onSubmit={this.handleSubmit}
                            >
                                LET ME IN
                            </Button>
                            <NavLink
                                className="a input-button fadeIn fifth"
                                to="/subcription"
                            >
                                S'inscrire
                            </NavLink>
                        </Form>

                        <NavLink className="a underlineHover" to={"/"}>
                            <div className="formFooter">Rale à vie</div>
                        </NavLink>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Login);
