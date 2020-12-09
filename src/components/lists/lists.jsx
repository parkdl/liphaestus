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

const Lists = ({ authService, taskDatabase }) => {
    const history = useHistory();
    const historyState = useHistory().state;

    const [selectedDate, setSelectedDate] = useState(moment());
    const [onAddTask, setAddTask] = useState("hidden");
    const [onCalendar, setCalendar] = useState("hidden");

    const [userId, setUserId] = useState(historyState && historyState.id);
    console.log(selectedDate);
    const onLogout = () => {
        authService.logout();
    };

    const onClick = event => {
        const value = event.target.innerHTML;
        switch (value) {
            case "Add":
                onAddTask === "hidden" ? setAddTask("visible") : setAddTask("hidden");
                break;
            case "Calendar":
                onCalendar === "hidden" ? setCalendar("visible") : setCalendar("hidden");
                break;
            default:
                return;
        }
    };

    const addTask = task => {
        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("MMM"),
            day: moment().format("D")
        };

        taskDatabase.saveTask(userId, dateValue, task);
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
                    <div className={styles.btns}>
                        <button className={styles.calendar} onClick={onClick}>
                            <span>Calendar</span>
                        </button>
                        <button className={styles.add} onClick={onClick}>
                            <span>Add</span>
                        </button>
                    </div>
                    <AddTask visible={onAddTask} addTask={addTask} />
                    <Calendar value={selectedDate} onChange={setSelectedDate} visible={onCalendar} />
                </section>

                <DisplayLists />
            </section>

            <Footer />
        </section>
    );
};

export default Lists;
