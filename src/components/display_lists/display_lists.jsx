import React from "react";
import styles from "./display_lists.module.css";
import ListItem from "../list_item/list_item";

const DisplayLists = props => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Display Lists</h1>
            <div className={styles.lists}>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        </section>
    );
};

export default DisplayLists;
