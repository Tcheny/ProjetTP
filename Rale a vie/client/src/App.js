import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
import Subcribe from "./components/Subcribe";

export default () => (
    <Router>
        <div>
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/subcription" component={Subcribe} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Home} />
            </Switch>
            <ToastContainer
                transition={Flip}
                position="top-center"
                autoClose={2000}
                hideProgressBar
            />
        </div>
    </Router>
);
