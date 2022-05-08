import "isomorphic-fetch/fetch-npm-browserify";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";


const app = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(app, document.getElementById("root"));
