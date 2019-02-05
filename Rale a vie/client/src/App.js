import React, { Fragment } from "react";
import { Login, Home, Subcribe, About, Settings } from "./scenes/index";
import { HashRouter, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { withUser } from "./UserProvider";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const App = ({ currentUser }) => (
    <div>
        <HashRouter>
            <AuthProvider>
                <Switch>
                    <Route path="/user/edit" component={Settings} />
                    <Route path="/about" component={About} />
                    <Route path="/subcription" component={Subcribe} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </AuthProvider>
        </HashRouter>
    </div>
);

export default App;

// export default (withUser = ({ currentUser }) => {
//     console.log("HEY", currentUser);
//         // const { currentUser, data } = this.props;
//         console.log("GLOBAL USER:", currentUser);
//         console.log("GLOBAL Data:", setName);

// return (

// <HashRouter>
//     <Switch>
//         <Route path="/user/edit" component={Settings} />
//         <Route path="/about" component={About} />
//         <Route path="/subcription" component={Subcribe} />
//         <Route path="/login" component={Login} />
//         <Route exact path="/" component={Home} />
//     </Switch>
// </HashRouter>
//     );
// });

/**
 * Le Consumer expose le contenu de la propriété `value`
 * du Provider
 */
// export default withUser(({ currentUser }) => (
//     <Fragment>
//         {currentUser && (
//             <h1>{currentUser.user_id}</h1>
// <HashRouter>
//     <Switch>
//         <Route path="/user/edit" component={Settings} />
//         <Route path="/about" component={About} />
//         <Route path="/subcription" component={Subcribe} />
//         <Route path="/login" component={Login} />
//         <Route exact path="/" component={Home} />
//     </Switch>
// </HashRouter>
//         )}
//     </Fragment>
// ));
