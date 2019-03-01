import React from 'react';
import DisplayComments from './DisplayComments';
import { UseConsumer } from '../../contexts/UseContext';

export default props => (
    <UseConsumer>
        {({ currentUser, users_id }) => (
            <DisplayComments
                {...props}
                currentUser={currentUser}
                users_id={users_id}
            />
        )}
    </UseConsumer>
);
