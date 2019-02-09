import React from "react";
import DisplayRale from "./DisplayRale";
import { AuthConsumer } from "../../contexts/AuthContext";

export default props => (
    <AuthConsumer>
        {({ isAuth, currentUser }) => (
            <DisplayRale {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </AuthConsumer>
);
