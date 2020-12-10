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
    const [toDoLists, setToDoLists] = useState({});

    const [userId, setUserId] = useState(historyState && historyState.id);

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

    const addOrUpdateTask = task => {
        setToDoLists(toDoLists => {
            const updated = { ...toDoLists };
            updated[task.id] = task;
            return updated;
        });

        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("MMM"),
            day: moment().format("D")
        };
        taskDatabase.saveTask(userId, dateValue, task);
    };

    const deleteList = id => {
        setToDoLists(toDoLists => {
            const updated = { ...toDoLists };
            delete updated[id];
            return updated;
        });

        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("MMM"),
            day: moment().format("D")
        };
        taskDatabase.deleteTask(userId, dateValue, id);
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

    useEffect(() => {
        if (!userId) {
            return;
        }
        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("MMM"),
            day: moment().format("D")
        };

        const stopSync = taskDatabase.syncLists(userId, dateValue, lists => {
            setToDoLists(lists);
        });
        return () => stopSync();
    }, [taskDatabase, userId]);

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
                    <AddTask visible={onAddTask} addTask={addOrUpdateTask} />
                    <Calendar value={selectedDate} onChange={setSelectedDate} visible={onCalendar} />
                </section>

                <DisplayLists lists={toDoLists} deleteTask={deleteList} />
            </section>

            <Footer />
        </section>
    );
};

export default Lists;
