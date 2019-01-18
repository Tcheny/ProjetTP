import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home, Subcribe } from './scenes/index';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/logout' component={Home}/>
                <Route exact path='/subcription' component={Subcribe} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/' component={Home} />
        </Switch>

        </Router>
    )
};

export default App;
