import React from "react";
import Search from "./Search";
import { UseConsumer } from "../../contexts/UseContext";

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser }) => (
            <Search {...props} isAuth={isAuth} currentUser={currentUser} />
        )}
    </UseConsumer>
);
