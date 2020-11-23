import React from "react";
import styles from "./header.module.css";

const Header = ({ onLogout }) => {
    return (
        <header className={styles.header}>
            <section className={styles.logoContainer}>
                <img className={styles.logo} src="/images/logo.png" alt="logo" />
                <p>Liphaestus</p>
            </section>
            {onLogout && (
                <button className={styles.logout} onClick={onLogout}>
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
