import React from "react";
import Login from "./Login";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>
        {({ isAuth, verifyCurrentUser }) => (
            <Login isAuth={isAuth} verifyCurrentUser={verifyCurrentUser} />
        )}
    </AuthConsumer>
);
