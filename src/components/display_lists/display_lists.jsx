import React from "react";
import styles from "./display_lists.module.css";
import ListItem from "../list_item/list_item";

const DisplayLists = ({ lists, deleteTask }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Display Lists</h1>
            <div className={styles.lists}>
                {Object.keys(lists).map(list => (
                    <ListItem key={list} list={lists[list]} deleteTask={deleteTask} />
                ))}
            </div>
        </section>
    );
};

export default DisplayLists;
