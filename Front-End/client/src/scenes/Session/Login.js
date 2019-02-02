import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";

import axios from "axios";
import "./session.css";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleSubmit = event => {
        event.preventDefault();

        axios
            .post("http://localhost:8081/login", {
                user_email: this.state.email,
                user_password: this.state.password
            })
            .then(res => {
                console.log("Login: ", res.data);
                this.props.history.push("/");
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <div className="wrapper">
                <div className=" fadeInDown">
                    <div className="formContent">
                        <div className="fadeIn first">
                            <img
                                src="https://p5.storage.canalblog.com/54/53/586993/105476253_o.jpg"
                                className="icon"
                                alt="User Icon"
                            />
                            <h1 className="title">LOGIN</h1>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="email"
                                className="fadeIn second"
                                placeholder="e-mail"
                                onChange={e =>
                                    this.setState({
                                        email: e.target.value
                                    })
                                }
                            />
                            <input
                                type="password"
                                className="fadeIn third"
                                placeholder="password"
                                onChange={e =>
                                    this.setState({
                                        password: e.target.value
                                    })
                                }
                            />
                            <button
                                type="submit"
                                className="input-button fadeIn fourth"
                                onSubmit={this.handleSubmit}
                            >
                                LET ME IN
                            </button>
                            <NavLink
                                className="a input-button fadeIn fifth"
                                to="/subcription"
                            >
                                S'inscrire
                            </NavLink>
                        </form>

                        <div className="formFooter">
                            <NavLink className="a underlineHover" to={"/"}>
                                Go to the Site
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
