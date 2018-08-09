import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import { Login, Home } from './components'

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path='/' component={Home} />
        </Switch>
    </Router> 
  )
}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'));