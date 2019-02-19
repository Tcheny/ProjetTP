import React from "react";
import DisplayRale from "./DisplayRale";
import { UseConsumer } from "../../contexts/UseContext";

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser }) => (
            <DisplayRale {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </UseConsumer>
);
