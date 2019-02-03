import React, { Component } from "react";
import { Login, Home, Subcribe, About, Settings } from "./scenes/index";
import { HashRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

export default class App extends Component {
    state = { currentUser: null, userId: null };

    verifyCurrentUser = async () => {
        await axios
            .get("http://localhost:8081/auth")
            .then(res => {
                console.log(res);
                this.setState({
                    currentUser: res.data.user,
                    userId: res.data.user.user_id
                });
            })
            .catch(error => {
                console.error(error.response);
                this.setState({
                    currentUser: error.response.data.user
                });
            });
    };

    componentDidMount = () => {
        this.verifyCurrentUser();
    };

    render() {
        const { currentUser, userId } = this.state;
        return (
            <HashRouter>
                <Switch>
                    <Route path="/user/edit" component={Settings} />
                    <Route
                        path="/about"
                        render={() => (
                            <About userId={userId} currentUser={currentUser} />
                        )}
                    />
                    <Route path="/subcription" component={Subcribe} />
                    <Route path="/login" component={Login} />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Home currentUser={currentUser} userId={userId} />
                        )}
                    />
                </Switch>
            </HashRouter>
        );
    }
}
