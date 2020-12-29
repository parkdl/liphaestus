import React, { useRef } from "react";
import styles from "./signUp.module.css";

const SignUp = ({ click, onSignUp }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const onClick = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        onSignUp(email, password);
    };

    return (
        <section className={styles.signUp}>
            <h2 className={styles.title}>Sign Up</h2>
            <article className={styles.emailAuth}>
                <div className={styles.input}>
                    <article className={styles.email}>
                        <h3 className={styles.inputTitle}>Email</h3>
                        <input ref={emailRef} type="email" name="email" />
                    </article>
                    <article className={styles.password}>
                        <h3 className={styles.inputTitle}>Password</h3>
                        <input ref={passwordRef} type="password" name="password" />
                    </article>
                </div>

                <button className={styles.submitBtn} onClick={onClick}>
                    Sign Up
                </button>
            </article>
            <article className={styles.goSignIn} onClick={click}>
                <p className={styles.signIn}>Go back sign In</p>
            </article>
        </section>
    );
};

export default SignUp;
