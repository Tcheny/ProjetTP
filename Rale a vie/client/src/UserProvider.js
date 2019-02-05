import React, { Component, Fragment } from "react";
import axios from "axios";

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext`, et on initialise une
 * propriété par défaut : "name" qui sera une chaine vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */

export const UserContext = React.createContext({});

/**
 * la classe UserProvider fera office de... Provider (!)
 * en wrappant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessible de manière globale via le `Consumer`
 */
class UserProvider extends Component {
    state = {
        currentUser: null // une valeur de départ
    };

    verifyCurrentUser = () => {
        axios
            .get("http://localhost:8081/auth")
            .then(res => {
                console.log(res);
                this.setState({
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

    // getCurrentUser = () => {
    //     return this.state.currentUser;
    // };

    componentDidMount = () => {
        // this.getCurrentUser();
        this.verifyCurrentUser();
    };

    render() {
        console.log("parent", this.state.currentUser);

        const contextValue = {
            data: this.state,
            currentUser: this.verifyCurrentUser
        };

        console.log("parent contextValue", this.state);

        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

/**
 * La fonction `withUser` sera notre HOC
 * qui se chargera d'injecter les propriétés de notre contexte
 * à n'importe quel composant qui l'appellera
 */
export const withUser = Component => props => (
    <UserContext.Consumer>
        {store => <Component {...props} {...store} />}
    </UserContext.Consumer>
);

export default UserProvider;
