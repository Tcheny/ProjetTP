import React from 'react';
import Post from './Post';
import { UseConsumer } from '../../contexts/UseContext';

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser, getAllPostsId }) => (
            <Post
                {...props}
                isAuth={isAuth}
                currentUser={currentUser}
                getAllPostsId={getAllPostsId}
            />
        )}
    </UseConsumer>
);
