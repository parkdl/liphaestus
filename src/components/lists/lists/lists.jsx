import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import AddTask from "../add_task/add_task";
import Calendar from "../calendar_lists/calendar";
import DisplayLists from "../display_lists/display_lists";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import styles from "./lists.module.css";
import UpdataTask from "../update_task/update_task";
import ListsNav from "../lists_nav/lists_nav";

const Lists = ({ authService, taskDatabase }) => {
    const history = useHistory();

    const historyState = useHistory().state;

    const [selectedDate, setSelectedDate] = useState(moment());

    const [toDoLists, setToDoLists] = useState({});
    const [onUpdate, setUpdate] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [onAddTask, setAddTask] = useState("hidden");
    const [onCalendar, setCalendar] = useState("hidden");
    const [userId, setUserId] = useState(historyState && historyState.id);

    const onLogout = () => {
        authService.logout();
    };

    const getSeletedTab = text => {
        if (text === "addTask") {
            onAddTask === "hidden" && setAddTask("visible");
            setCalendar("hidden");
        } else if (text === "calendar") {
            onCalendar === "hidden" && setCalendar("visible");
            setAddTask("hidden");
        }
    };

    const onCloseTab = () => {
        setAddTask("hidden");
        setCalendar("hidden");
        setUpdate(false);
    };

    const finishedOrTimer = item => {
        setToDoLists(toDoLists => {
            const updated = { ...toDoLists };
            updated[item.id] = item;
            return updated;
        });

        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("Mo"),
            weekOfYear: moment().format("W"),
            day: moment().format("D")
        };
        taskDatabase.saveTask(userId, dateValue, item);
    };

    const addOrUpdateTask = task => {
        setToDoLists(toDoLists => {
            const updated = { ...toDoLists };
            updated[task.id] = task;
            return updated;
        });

        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("Mo"),
            weekOfYear: moment().format("W"),
            day: moment().format("D")
        };
        taskDatabase.saveTask(userId, dateValue, task);
        setUpdate(false);
        setAddTask("hidden");
        setUpdateData({});
    };

    const getUpdate = list => {
        setUpdateData(list);
        setAddTask("visible");
        setUpdate(true);
    };

    const deleteList = id => {
        setToDoLists(toDoLists => {
            const updated = { ...toDoLists };
            delete updated[id];
            return updated;
        });

        const dateValue = {
            year: moment().format("YYYY"),
            month: moment().format("Mo"),
            weekOfYear: moment().format("W"),
            day: moment().format("D")
        };
        taskDatabase.deleteTask(userId, dateValue, id);
    };

    const compareDate = () => {
        const now = `${moment().format("YYYY")}.${moment().format("Mo")}.${moment().format("D")}`;
        const selected = `${selectedDate.format("YYYY")}.${selectedDate.format("Mo")}.${selectedDate.format("D")}`;

        return now === selected && true;
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
            year: selectedDate.format("YYYY"),
            month: selectedDate.format("Mo"),
            weekOfYear: moment().format("W"),
            day: selectedDate.format("D")
        };

        const stopSync = taskDatabase.syncLists(userId, dateValue, lists => {
            setToDoLists(lists);
        });

        return () => stopSync();
    }, [selectedDate, taskDatabase, userId]);

    return (
        <section className={styles.lists}>
            <Header onLogout={onLogout} path={history} />

            <section className={styles.lists_container}>
                <section className={styles.set_lists}>
                    {!onUpdate ? (
                        <AddTask visible={onAddTask} addTask={addOrUpdateTask} />
                    ) : (
                        <UpdataTask visible={onAddTask} addTask={addOrUpdateTask} list={updateData} />
                    )}

                    <Calendar visible={onCalendar} value={selectedDate} onChange={setSelectedDate} />

                    <div
                        className={`${styles.close_tab} ${(onAddTask === "visible" || onCalendar === "visible") && `${styles.close_visible}`}`}
                        onClick={onCloseTab}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                </section>

                <DisplayLists lists={toDoLists} deleteTask={deleteList} update={getUpdate} compare={compareDate} finished={finishedOrTimer} />
            </section>

            <ListsNav select={getSeletedTab} />
            <Footer />
        </section>
    );
};

export default Lists;
