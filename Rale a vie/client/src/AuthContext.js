import React from "react";
import axios from "axios";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = {
        isAuth: false,
        currentUser: null // une valeur de départ
    };

    verifyCurrentUser = () => {
        axios
            .get("http://localhost:8081/auth")
            .then(res => {
                console.log(res);
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

    login = () => {
        setTimeout(() => this.setState({ isAuth: true }), 1000);
    };

    logout = () => {
        axios
            .get("http://localhost:8081/logout")
            .then(res => {
                console.log("logout: ", res);
                this.setState({ isAuth: false });
                this.props.history.push("/login");
            })
            .catch(error => {
                console.error(error);
            });
    };

    componentDidMount = () => {
        this.verifyCurrentUser();
    };

    render() {
        console.log("parent contextValue", this.state);

        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.isAuth,
                    login: this.login,
                    logout: this.logout,
                    currentUser: this.verifyCurrentUser
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
