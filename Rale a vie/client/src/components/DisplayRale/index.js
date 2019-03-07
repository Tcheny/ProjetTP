import React from 'react';
import DisplayRale from './DisplayRale';
import { UseConsumer } from '../../contexts/UseContext';

export default props => (
    <UseConsumer>
        {({ isAuth, currentUser, users_id, getAllUsersById, posts_id, getAllRalesId }) => (
            <DisplayRale
                {...props}
                isAuth={isAuth}
                currentUser={currentUser}
                users_id={users_id}
                getAllUsersById={getAllUsersById}
                posts_id={posts_id}
                getAllRalesId={getAllRalesId}
            />
        )}
    </UseConsumer>
);
