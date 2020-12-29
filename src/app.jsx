import React from "react";
import styles from "./app.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home/home";
import Analysis from "./components/analysis/analysis/analysis";
import Lists from "./components/lists/lists/lists";

function App({ authService, taskDatabase }) {
    return (
        <div className={styles.app}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home authService={authService} />
                    </Route>
                    <Route exact path="/lists">
                        <Lists authService={authService} taskDatabase={taskDatabase} />
                    </Route>
                    <Route exact path="/analysis">
                        <Analysis authService={authService} taskDatabase={taskDatabase} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
