import React from 'react';
import Login from './Login';
import { UseConsumer } from '../../contexts/UseContext';

export default () => (
    <UseConsumer>
        {({ verifyCurrentUser }) => <Login verifyCurrentUser={verifyCurrentUser} />}
    </UseConsumer>
);
