import React, { useEffect, useState } from "react";
import styles from "./list_item_fin.module.css";

const ListItemFin = ({ list }) => {
    const [pomodoroTime, setPomodoroTime] = useState({
        min: "0",
        sec: "0"
    });

    useEffect(() => {
        const total = list.time;
        const min = parseInt(total / 60);
        const sec = total % 60;

        setPomodoroTime({
            min,
            sec
        });
    }, [list.time]);

    return (
        <section className={styles.container}>
            <div className={styles.list}>
                <div className={styles.front}>
                    <label className={styles.checkbox}>
                        {list.finished ? <span className={styles.checkMark}></span> : <span className={styles.emptyCheckMark}></span>}
                    </label>
                </div>
                <div className={styles.mid}>
                    <div className={styles.box_top}>
                        <p className={styles.list_value}>{list.task}</p>
                    </div>
                    <div className={styles.box_bottom}>
                        <div className={styles.pomodoro}>
                            <div className={styles.title}>
                                <span>P</span>
                            </div>
                            <div className={styles.timer}>
                                {pomodoroTime.min < 10 ? `0${pomodoroTime.min}` : `${pomodoroTime.min}`}:
                                {pomodoroTime.sec < 10 ? `0${pomodoroTime.sec}` : `${pomodoroTime.sec}`}
                            </div>
                        </div>
                        <ul className={styles.info_list}>
                            <li className={styles.category}>{list.category}</li>
                            <li className={styles.priority}>{list.priority}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListItemFin;
