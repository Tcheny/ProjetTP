import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * `createContext` contains 2 properties:
 * `Provider` and` Consumer`. We make them accessible
 * with `UseContext` constant, and we initialize the state.
 * This context is exported,it can be exploited by
 * other components later with `Consumer`
 */
const UseContext = React.createContext();

/**
 * Class UseProvider will act as Provider
 * by wrapping his child component. In this way, his values
 * will be accessible globally with the `Consumer`
 */
export class UseProvider extends Component {
    state = {
        isAuth: false,
        currentUser: null,
        users_id: [],
        posts_id: [],
    };

    componentDidMount = async () => {
        try {
            await this.verifyCurrentUser();
            this.getAllUsersById();
        } catch (error) {
            console.log(error);
        }
    };

    verifyCurrentUser = async () => {
        let authentication = null;

        try {
            authentication = await axios.get('http://localhost:8081/auth');
            this.setState({
                isAuth: true,
                currentUser: authentication.data.user,
            });
        } catch (error) {
            this.setState({ currentUser: error.response.data.user });
            throw new Error(`Utilisateur non authentifié`);
        }
    };

    logout = async () => {
        try {
            await axios.get('http://localhost:8081/logout');
            toast.info(`A bientôt ${this.state.currentUser.user_pseudo} !`);
            this.setState({ isAuth: false, currentUser: null });
        } catch (error) {
            console.error(error);
            toast.error('Error logout !');
        }
    };

    getAllUsersById = async () => {
        let allUsersId = null;

        try {
            allUsersId = await axios.get('http://localhost:8081/users/all');
            this.setState({ users_id: allUsersId.data });
        } catch (error) {
            console.error(error);
        }
    };

    getAllRalesId = async () => {
        let allPostsId = null;

        try {
            allPostsId = await axios.get('http://localhost:8081/posts/allId');
            this.setState({ posts_id: allPostsId.data });
        } catch (error) {
            console.error(error);
        }
    };

    action = {
        verifyCurrentUser: this.verifyCurrentUser,
        logout: this.logout,
        getAllUsersById: this.getAllUsersById,
        getAllRalesId: this.getAllRalesId,
    };

    render() {
        return (
            <UseContext.Provider
                value={{
                    ...this.state,
                    ...this.action,
                }}
            >
                {this.props.children}
            </UseContext.Provider>
        );
    }
}

/**
 * Consumer exposes the contents of the `value` property
 * Provider
 */
export const UseConsumer = UseContext.Consumer;

export default UseProvider;
