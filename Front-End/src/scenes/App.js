import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home } from './index'

// state currentUser req pour la connexion (créer une page ou modale pour s'inscrire)


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