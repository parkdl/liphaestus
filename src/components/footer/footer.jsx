import React from "react";
import { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
    <footer className={styles.footer}>
        <p className={styles.copyRight}>© Copyright Liphaestus 2020</p>
    </footer>
));

export default Footer;
