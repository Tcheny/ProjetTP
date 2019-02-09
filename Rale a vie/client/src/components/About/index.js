import React from "react";
import About from "./About";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>
        {({ currentUser }) => <About currentUser={currentUser} />}
    </AuthConsumer>
);
