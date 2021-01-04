import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import moment from "moment";
import styles from "./analysis.module.css";
import Calendar from "../../calendar/calendar";
import Nav from "../../nav/nav";
import Daily from "../daily/daily";
import Weekly from "../weekly/weekly";
import Monthly from "../monthly/monthly";

const Analysis = ({ authService, taskDatabase }) => {
    const history = useHistory();
    const historyState = useHistory().state;

    const [userId, setUserId] = useState(historyState && historyState.id);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [toDoLists, setToDoLists] = useState({});

    const [mainItem, setMainItem] = useState("Calendar");

    const getMainItem = item => {
        setMainItem(item);
    };

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

    useEffect(() => {
        const dateValue = {
            year: selectedDate.format("YYYY"),
            month: selectedDate.format("MMM"),
            day: selectedDate.format("D")
        };

        const stopSync = taskDatabase.syncLists(userId, dateValue, lists => {
            setToDoLists(lists);
        });

        return () => stopSync();
    }, [selectedDate, taskDatabase, userId]);

    return (
        <section className={styles.analysis}>
            <Header onLogout={onLogout} path={history} />
            <section className={styles.container}>
                {mainItem === "Calendar" && <Calendar value={selectedDate} onChange={setSelectedDate} visible={"visible"} />}
                {mainItem === "Daily" && <Daily lists={toDoLists} />}
                {mainItem === "Weekly" && <Weekly />}
                {mainItem === "Monthly" && <Monthly />}
            </section>
            <Nav getMain={getMainItem} mainItem={mainItem} />
            <Footer />
        </section>
    );
};

export default Analysis;
