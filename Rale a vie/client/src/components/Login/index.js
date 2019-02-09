import React from "react";
import Login from "./Login";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>{({ isAuth }) => <Login isAuth={isAuth} />}</AuthConsumer>
);
