import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home } from './scenes/index';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' component={Home} />
        </Switch>

        </Router>
    )
};

export default App;
