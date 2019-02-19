import React from "react";
import Login from "./Login";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>
        {({ isAuth, verifyCurrentUser }) => (
            <Login isAuth={isAuth} verifyCurrentUser={verifyCurrentUser} />
        )}
    </UseConsumer>
);
