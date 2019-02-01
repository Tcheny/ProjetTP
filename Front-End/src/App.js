import React, { Component } from "react";
import { Login, Home, Subcribe, About, Settings } from "./scenes/index";
import { HashRouter, Switch, Route } from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/user/edit" component={Settings} />
                    <Route path="/about" component={About} />
                    <Route path="/subcription" component={Subcribe} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </HashRouter>
        );
    }
}
