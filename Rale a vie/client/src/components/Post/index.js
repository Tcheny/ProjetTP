import React from "react";
import Post from "./Post";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>
        {({ isAuth, currentUser, getAllPostsId }) => (
            <Post
                isAuth={isAuth}
                currentUser={currentUser}
                getAllPostsId={getAllPostsId}
            />
        )}
    </UseConsumer>
);
