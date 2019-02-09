import React from "react";
import Subcribe from "./Subcribe";
import { AuthConsumer } from "../../contexts/AuthContext";

export default props => (
    <AuthConsumer>
        {({ isAuth, currentUser }) => (
            <Subcribe {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </AuthConsumer>
);
