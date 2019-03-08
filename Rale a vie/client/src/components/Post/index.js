import React from 'react';
import Post from './Post';
import { UseConsumer } from '../../contexts/UseContext';

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser, getAllRalesId }) => (
            <Post {...props} isAuth={isAuth} currentUser={currentUser} getAllRalesId={getAllRalesId} />
        )}
    </UseConsumer>
);
