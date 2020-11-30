import React from "react";
import styles from "./calendar_header.module.css";

const CalendarHeader = ({ value, onChange }) => {
    const currMonthName = () => {
        return value.format("MMMM");
    };

    const currYear = () => {
        return value.format("YYYY");
    };

    const prevMonth = () => {
        return value.clone().subtract(1, "month");
    };

    const nextMonth = () => {
        return value.clone().add(1, "month");
    };

    return (
        <header className={styles.header}>
            <div className={styles.previous} onClick={() => onChange(prevMonth())}>
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className={styles.current}>
                {currMonthName()} {currYear()}
            </div>
            <div className={styles.next} onClick={() => onChange(nextMonth())}>
                <i className="fas fa-chevron-right"></i>
            </div>
        </header>
    );
};

export default CalendarHeader;
