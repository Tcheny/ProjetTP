import React from "react";
import Search from "./Search";
import { AuthConsumer } from "../../contexts/AuthContext";

export default props => (
    <AuthConsumer>
        {({ isAuth, currentUser }) => (
            <Search {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </AuthConsumer>
);
