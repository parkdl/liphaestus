import React, { useEffect, useState } from "react";
import styles from "./calendar.module.css";
import CalendarHeader from "./calendar_header";
import moment from "moment";

const Calendar = ({ value, onChange, visible }) => {
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    const buildCalendar = date => {
        const items = [];

        const startDay = date.clone().startOf("month").startOf("week");
        const endDay = date.clone().endOf("month").endOf("week");

        const _date = startDay.clone().subtract(1, "day");

        while (_date.isBefore(endDay, "day")) {
            items.push(
                Array(7)
                    .fill(0)
                    .map(() => _date.add(1, "day").clone())
            );
        }

        return items;
    };

    const isSelected = day => {
        return value.isSame(day, "day");
    };

    const isToday = day => {
        return moment(new Date()).isSame(day, "day");
    };

    const dayStyles = day => {
        if (isSelected(day)) return "selected";
        if (isToday(day)) return "today";
        return "";
    };
    return (
        <section className={`${styles.container} ${styles[visible]}`}>
            <CalendarHeader value={value} onChange={onChange} />

            <div className={styles.body}>
                <ul className={styles.day_names}>
                    {["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"].map(d => (
                        <li key={d} className={styles.week}>
                            {d}
                        </li>
                    ))}
                </ul>
                {calendar.map((week, wi) => (
                    <div key={wi}>
                        {week.map((day, di) => (
                            <div key={di} className={styles.day} onClick={() => onChange(day)}>
                                <div className={styles[dayStyles(day)]}>{day.format("D").toString()}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Calendar;
