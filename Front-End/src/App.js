import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components';

import { Login, Header, Post } from './components'

const StyledBody = styled.div`
  width: 80%;
  margin: auto;
`;

const App = () => {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-light justify-content-between">
          <a class="navbar-brand">Rale à vie</a>
          <Link to="/login">Connexion</Link>
        </nav>
          <Route path="/login" component={Login} />
    
          <StyledBody>
            <Header />
            <Post />
          </StyledBody>

        </div>
    </Router>
    
  )
}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'));