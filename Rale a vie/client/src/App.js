import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
import Subcribe from "./components/Subcribe";

export default () => (
    <HashRouter>
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/subcription" component={Subcribe} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
        </Switch>
    </HashRouter>
);
