import React from "react";
import DisplayComments from "./DisplayComments";
import { UseConsumer } from "../../contexts/UseContext";

export default props => (
    <UseConsumer>
        {({ currentUser, verifyCurrentUser }) => (
            <DisplayComments
                {...props}
                currentUser={currentUser}
                verifyCurrentUser={verifyCurrentUser}
            />
        )}
    </UseConsumer>
);
