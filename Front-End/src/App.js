import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import { Login, Home } from './components'

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
    </Router> 
  )
};

export default App;

ReactDOM.render(<App/>, document.getElementById('root'));