import React from "react";
import styles from "./display_lists.module.css";
import ListItem from "../list_item/list_item";
import ListItemFin from "../list_item/list_item_fin";

const DisplayLists = ({ lists, deleteTask, update, compare, finished }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Display Lists</h1>
            <div className={styles.lists}>
                {compare()
                    ? Object.keys(lists).map(list => (
                          <ListItem key={list} list={lists[list]} deleteTask={deleteTask} update={update} finished={finished} />
                      ))
                    : Object.keys(lists).map(list => <ListItemFin key={list} list={lists[list]} />)}
            </div>
        </section>
    );
};

export default DisplayLists;
