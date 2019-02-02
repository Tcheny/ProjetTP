import React, { Component } from "react";
import { Login, Home, Subcribe, About, Settings } from "./scenes/index";
import { HashRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

export default class App extends Component {
    state = { currentUser: null };

    verifyCurrentUser = () => {
        axios
            .get("http://localhost:8081/auth")
            .then(res => {
                console.log(res);
                this.setState({
                    currentUser: res.data.user
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
        const { user } = this.state;
        return (
            <HashRouter>
                <Switch>
                    <Route path="/user/edit" component={Settings} />
                    <Route path="/about" render={() => <About user={user} />} />
                    <Route path="/subcription" component={Subcribe} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" render={() => <Home user={user} />} />
                </Switch>
            </HashRouter>
        );
    }
}
