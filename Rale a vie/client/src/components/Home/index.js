import React from "react";
import Home from "./Home";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>{({ isAuth }) => <Home isAuth={isAuth} />}</UseConsumer>
);
