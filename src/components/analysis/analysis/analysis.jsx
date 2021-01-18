import React, { useCallback, useEffect, useState } from "react";
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
    const [weeklyList, setWeeklyList] = useState({});
    const [monthlyList, setMonthlyList] = useState({});

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

    const dailyData = useCallback(() => {
        const dateValue = {
            year: selectedDate.format("YYYY"),
            month: selectedDate.format("Mo"),
            weekOfYear: selectedDate.format("W"),
            day: selectedDate.format("D")
        };

        const stopSync = taskDatabase.syncLists(userId, dateValue, lists => {
            setToDoLists(lists);
        });

        return () => stopSync();
    }, [selectedDate, taskDatabase, userId]);

    const weeklyData = useCallback(() => {
        const dateValue = {
            year: selectedDate.format("YYYY"),
            month: selectedDate.format("Mo"),
            weekOfYear: selectedDate.format("W")
        };

        const stopSync = taskDatabase.syncWeekLists(userId, dateValue, lists => {
            setWeeklyList(lists);
        });

        return () => stopSync();
    }, [selectedDate, taskDatabase, userId]);

    const monthlyData = useCallback(() => {
        const dateValue = {
            year: selectedDate.format("YYYY"),
            month: selectedDate.format("Mo")
        };

        const stopSync = taskDatabase.syncMonthLists(userId, dateValue, lists => {
            setMonthlyList(lists);
        });

        return () => stopSync();
    }, [selectedDate, taskDatabase, userId]);

    useEffect(() => {
        mainItem === "Daily" && dailyData();
        mainItem === "Weekly" && weeklyData();
        mainItem === "Monthly" && monthlyData();
    }, [dailyData, mainItem, monthlyData, weeklyData]);

    return (
        <section className={styles.analysis}>
            <Header onLogout={onLogout} path={history} />
            <section className={styles.container}>
                {mainItem === "Calendar" && <Calendar value={selectedDate} onChange={setSelectedDate} visible={"visible"} />}
                {mainItem === "Daily" && <Daily lists={toDoLists} />}
                {mainItem === "Weekly" && <Weekly lists={weeklyList} />}
                {mainItem === "Monthly" && <Monthly lists={monthlyList} />}
            </section>
            <Nav getMain={getMainItem} mainItem={mainItem} />
            <Footer />
        </section>
    );
};

export default Analysis;
