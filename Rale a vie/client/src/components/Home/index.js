import React from "react";
import Home from "./Home";
import { UseConsumer } from "../../contexts/UseContext";

export default () => (
    <UseConsumer>
        {({ isAuth, posts_id, getAllPostsId }) => (
            <Home
                isAuth={isAuth}
                posts_id={posts_id}
                getAllPostsId={getAllPostsId}
            />
        )}
    </UseConsumer>
);
