import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { UseProvider } from "./contexts/UseContext";

render(
    <UseProvider>
        <App />
    </UseProvider>,
    document.getElementById("root")
);
