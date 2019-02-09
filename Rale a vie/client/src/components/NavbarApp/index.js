import React from "react";
import NavbarApp from "./NavbarApp";
import { AuthConsumer } from "../../contexts/AuthContext";

export default () => (
    <AuthConsumer>
        {value => {
            const { isAuth, logout } = value;
            return <NavbarApp isAuth={isAuth} logout={logout} />;
        }}
    </AuthConsumer>
);
