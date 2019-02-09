import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import axios from "axios";

class Subcribe extends Component {
    state = {
        user: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            pseudo: ""
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            password: this.state.password,
            pseudo: this.state.pseudo,
            type: "admin",
            infos: ""
        };

        axios
            .post("http://localhost:8081/users/add", { user })
            .then(res => {
                console.log("UserAdd: ", res);
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
                            <h1 className="title">Log in</h1>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="input-text fadeIn second"
                                placeholder="Nom"
                                onChange={e =>
                                    this.setState({
                                        lastname: e.target.value
                                    })
                                }
                            />
                            <input
                                type="text"
                                className="input-text fadeIn second"
                                placeholder="Prénom"
                                onChange={e =>
                                    this.setState({
                                        firstname: e.target.value
                                    })
                                }
                            />
                            <input
                                type="email"
                                className="input-text fadeIn third"
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
                            <input
                                type="text"
                                className="input-text fadeIn fourth"
                                placeholder="Pseudo"
                                onChange={e =>
                                    this.setState({
                                        pseudo: e.target.value
                                    })
                                }
                            />
                            <button
                                type="submit"
                                className="input-button fadeIn fifth"
                                onSubmit={this.handleSubmit}
                            >
                                SE CONNECTER
                            </button>
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

export default withRouter(Subcribe);
