import React from "react";
import styles from "./lists_nav.module.css";

const ListsNav = ({ select }) => (
    <section className={styles.btns}>
        <button className={styles.calendar} onClick={() => select("calendar")}>
            <span>Calendar</span>
        </button>
        <button className={styles.add} onClick={() => select("addTask")}>
            <span>Add</span>
        </button>
    </section>
);

export default ListsNav;
