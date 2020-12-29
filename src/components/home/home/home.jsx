import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Footer from "../../footer/footer";
import Header from "../../header/header";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signUp";
import styles from "./home.module.css";

const Home = ({ authService }) => {
    const history = useHistory();

    const [turnSign, setTurnSign] = useState(false);

    const turnSignType = () => setTurnSign(!turnSign);

    const goToList = userId => {
        history.push({
            pathname: "/lists",
            state: { id: userId }
        });
    };

    const onSignUp = (email, password) => {
        authService //
            .emailSignUp(email, password)
            .then(setTurnSign(!turnSign));
    };

    const onEmailSignIn = (email, password) => {
        authService //
            .emailSignIn(email, password)
            .then(data => goToList(data.user.uid));
    };

    const onGoogleSignIn = () => {
        authService //
            .googleLogin()
            .then(data => goToList(data.user.uid));
    };

    useEffect(() => {
        authService //
            .onAuthChange(user => {
                user && goToList(user.uid);
            });
    });

    return (
        <section className={styles.homeContainer}>
            <Header />

            <section className={styles.homeMain}>
                <article className={styles.banner}>
                    <img src="/images/galaxy.png" alt="background" />
                    {turnSign ? (
                        <SignUp onSignUp={onSignUp} click={turnSignType} />
                    ) : (
                        <SignIn onSignIn={onEmailSignIn} onGoogle={onGoogleSignIn} click={turnSignType} />
                    )}
                </article>
            </section>

            <Footer />
        </section>
    );
};

export default Home;
