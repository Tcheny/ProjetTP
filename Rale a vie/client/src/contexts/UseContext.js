import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UseContext`, et on initialise le state.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
const UseContext = React.createContext();

/**
 * la classe UseProvider fera office de... Provider (!)
 * en wrappant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessible de manière globale via le `Consumer`
 */
export class UseProvider extends React.Component {
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

    getAllPostsId = async () => {
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
        getAllPostsId: this.getAllPostsId,
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
 * Le Consumer expose le contenu de la propriété `value`
 * du Provider
 */
export const UseConsumer = UseContext.Consumer;

export default withRouter(UseProvider);
