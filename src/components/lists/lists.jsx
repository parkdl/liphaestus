import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import AddTask from "../add_task/add_task";
import Calendar from "../calendar/calendar";
import DisplayLists from "../display_lists/display_lists";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./lists.module.css";

const Lists = ({ authService }) => {
    const history = useHistory();
    const historyState = useHistory().state;

    const [selectedDate, setSelectedDate] = useState(moment());

    const [userId, setUserId] = useState(historyState && historyState.id);

    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                history.push("/");
            }
        });
    }, [authService, history]);

    return (
        <section className={styles.lists}>
            <Header onLogout={onLogout} />

            <section className={styles.lists_container}>
                <section className={styles.set_lists}>
                    <AddTask />
                    <Calendar value={selectedDate} onChange={setSelectedDate} />
                </section>

                <DisplayLists />
            </section>

            <Footer />
        </section>
    );
};

export default Lists;
