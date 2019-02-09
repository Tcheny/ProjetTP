import React from "react";
import Home from "./Home";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>{({ isAuth }) => <Home isAuth={isAuth} />}</AuthConsumer>
);
