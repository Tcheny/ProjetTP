import React from "react";
import About from "./About";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>
        {({ currentUser, verifyCurrentUser }) => (
            <About
                currentUser={currentUser}
                verifyCurrentUser={verifyCurrentUser}
            />
        )}
    </AuthConsumer>
);
