import React, { memo } from "react";

import styles from "./header.module.css";

const Header = memo(({ onLogout, path }) => {
    const movePath = () => {
        const pathname = path.location.pathname;

        pathname === "/lists" ? path.push("/analysis") : path.push("/lists");
    };

    return (
        <header className={styles.header}>
            <section className={styles.logoContainer}>
                <img className={styles.logo} src="/images/logo.png" alt="logo" />
                <p>Liphaestus</p>
            </section>
            {onLogout && (
                <section>
                    <button className={styles.analysis} onClick={movePath}>
                        {path.location.pathname === "/lists" ? "Analysis" : "Lists"}
                    </button>
                    <button className={styles.logout} onClick={onLogout}>
                        Logout
                    </button>
                </section>
            )}
        </header>
    );
});

export default Header;
