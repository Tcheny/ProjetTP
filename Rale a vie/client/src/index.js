import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { AuthProvider } from "./contexts/AuthContext";

render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById("root")
);
