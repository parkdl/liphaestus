import React from "react";
import styles from "./app.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import Lists from "./components/lists/lists";

function App({ authService }) {
    return (
        <div className={styles.app}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home authService={authService} />
                    </Route>
                    <Route exact path="/lists">
                        <Lists authService={authService} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile authService={authService} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
