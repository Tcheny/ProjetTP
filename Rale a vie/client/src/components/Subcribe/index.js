import React from "react";
import Subcribe from "./Subcribe";
import { UseConsumer } from "../../contexts/UseContext";

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser, verifyCurrentUser }) => (
            <Subcribe
                {...props}
                isAuth={isAuth}
                currentUser={currentUser}
                verifyCurrentUser={verifyCurrentUser}
            />
        )}
    </UseConsumer>
);
