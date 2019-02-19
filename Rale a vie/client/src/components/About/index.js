import React from "react";
import About from "./About";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>
        {({ currentUser, verifyCurrentUser }) => (
            <About
                currentUser={currentUser}
                verifyCurrentUser={verifyCurrentUser}
            />
        )}
    </UseConsumer>
);
