import React, { useRef } from "react";
import styles from "./signIn.module.css";

const SignIn = ({ click, onSignIn, onGoogle }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const onEmailSign = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        onSignIn(email, password);
    };

    return (
        <section className={styles.signIn}>
            <h2 className={styles.title}>Sign In</h2>
            <article className={styles.emailAuth}>
                <div className={styles.input}>
                    <article className={styles.email}>
                        <h3>Email</h3>
                        <input ref={emailRef} type="email" name="email" />
                    </article>
                    <article className={styles.password}>
                        <h3>Password</h3>
                        <input ref={passwordRef} type="password" name="password" />
                    </article>
                </div>

                <button className={styles.submitBtn} onClick={onEmailSign}>
                    Sign In
                </button>
            </article>
            <article className={styles.googleAuth}>
                <p className={styles.divider}>
                    <span>Or Sign In</span>{" "}
                </p>
                <button className={styles.googleBtn} onClick={onGoogle}>
                    Google로 로그인
                </button>
            </article>
            <article className={styles.goSignUp} onClick={click}>
                <p className={styles.account}>Create a new account</p>
            </article>
        </section>
    );
};

export default SignIn;
