import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import AuthService from "./service/auth_service";
import "@fortawesome/fontawesome-free/js/all.js";
import TaskDatabase from "./service/task_database";

const authService = new AuthService();
const taskDatabase = new TaskDatabase();

ReactDOM.render(
    <React.StrictMode>
        <App authService={authService} taskDatabase={taskDatabase} />
    </React.StrictMode>,
    document.getElementById("root")
);
