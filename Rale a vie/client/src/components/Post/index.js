import React from "react";
import Post from "./Post";
import { AuthConsumer } from "../../contexts/AuthContext";

export default props => (
    <AuthConsumer>
        {({ isAuth, currentUser }) => (
            <Post {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </AuthConsumer>
);
