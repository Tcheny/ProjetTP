import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import UserProvider from "./UserProvider";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { AuthProvider } from "./AuthContext";
// import ProtectedRoute from "./ProtectedRoute";

// const App = () => (
//     <div>
//         <Router>
//             <AuthProvider>
//                 <Switch>
//                     <Route path="/user/edit" component={Settings} />
//                     <Route path="/about" component={About} />
//                     <Route path="/subcription" component={Subcribe} />
//                     <Route path="/login" component={Login} />
//                     <Route exact path="/" component={Home} />
//                 </Switch>
//             </AuthProvider>
//         </Router>
//     </div>
// );

render(<App />, document.getElementById("root"));
