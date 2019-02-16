import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `AuthContext`, et on initialise le state.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
const AuthContext = React.createContext();

/**
 * la classe AuthProvider fera office de... Provider (!)
 * en wrappant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessible de manière globale via le `Consumer`
 */
export class AuthProvider extends React.Component {
    state = {
        isNav: false,
        isAuth: false,
        currentUser: null
    };

    componentDidMount = async () => {
        await this.verifyCurrentUser();
    };

    verifyCurrentUser = async () => {
        await axios
            .get("http://localhost:8081/auth")
            .then(res => {
                this.setState({
                    isAuth: true,
                    currentUser: res.data.user
                });
            })
            .catch(error => {
                console.error("plus rien ", error.response);
                this.setState({
                    currentUser: error.response.data.user
                });
            });
    };

    logout = async () => {
        await axios
            .get("http://localhost:8081/logout")
            .then(res => {
                console.log("logout: ", res);
                toast(`A bientôt ${this.state.currentUser.user_pseudo} !`);

                this.setState({
                    isAuth: false,
                    currentUser: null
                });
            })
            .catch(error => {
                console.error(error);
                toast.error("Error logout !", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    };

    render() {
        console.log("AUTH:", { ...this.state });
        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                    verifyCurrentUser: this.verifyCurrentUser,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

/**
 * Le Consumer expose le contenu de la propriété `value`
 * du Provider
 */
export const AuthConsumer = AuthContext.Consumer;

export default withRouter(AuthProvider);
