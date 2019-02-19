import React from "react";
import NavbarApp from "./NavbarApp";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>
        {value => {
            const { isAuth, logout } = value;
            return <NavbarApp isAuth={isAuth} logout={logout} />;
        }}
    </UseConsumer>
);
