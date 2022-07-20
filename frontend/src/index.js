import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from './app/store';
import { Provider } from 'react-redux';
import "./index.css";
import "./utilities/Common.css";
import "./utilities/Layout.css";
import "./utilities/Sizes.css";
import "./utilities/Text.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </React.StrictMode>
);

reportWebVitals();