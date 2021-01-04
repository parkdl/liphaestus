import React, { useCallback, useEffect, useState } from "react";
import styles from "./daily.module.css";

const Daily = ({ lists }) => {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState();
    const [finishTask, setFinishTask] = useState({
        total: 0,
        finished: 0,
        percent: 0,
        style: null
    });
    const [pomodoro, setPomodoro] = useState({
        min: 0,
        sec: 0
    });

    const transferTime = useCallback(total => {
        const min = parseInt(total / 60);
        const sec = total % 60;

        setPomodoro({
            min,
            sec
        });
    }, []);

    const getPomodoroTime = useCallback(() => {
        let timeArray = [];
        let total = 0;

        Object.keys(lists).map(list => timeArray.push(lists[list].time));

        timeArray.forEach(time => (total += time));

        transferTime(total);
    }, [lists, transferTime]);

    const getFinishTask = useCallback(() => {
        let checkTask = 0;

        list.forEach(item => item.finished && checkTask++);

        const percent = parseInt((checkTask / list.length) * 100);
        let value = 1;
        const animated = setInterval(() => {
            if (value < percent + 1) {
                setFinishTask({
                    total: list.length,
                    finished: checkTask,
                    percent,
                    style: { background: `conic-gradient(gray 0% ${value}%, white ${value}% 100%)` }
                });
                value++;
            } else {
                clearInterval(animated);
            }
        }, 10);
    }, [list]);

    const getSelected = text => {
        setSelected(text);
    };

    useEffect(() => {
        let listArray = [];
        Object.keys(lists).map(list => listArray.push(lists[list]));

        setList(listArray);
        setSelected("finished");
        getPomodoroTime();
    }, [getPomodoroTime, lists]);

    useEffect(() => {
        getFinishTask();
    }, [getFinishTask]);

    return (
        <section className={styles.container}>
            <div className={styles.controler}>
                <button className={styles.finished} onClick={() => getSelected("finished")}>
                    Finished Task
                </button>
                <button className={styles.pomodoro} onClick={() => getSelected("pomodoro")}>
                    Pomodoro Time
                </button>
            </div>
            <div className={styles.main}>
                {selected === "finished" && (
                    <div className={styles.finished_main}>
                        <div className={styles.pie_chart} style={finishTask.style}>
                            <p className={styles.pie_chart_text}>
                                <span>{finishTask.percent}%</span>
                                <span>
                                    ({finishTask.finished} / {finishTask.total})
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                {selected === "pomodoro" && (
                    <div className={styles.pomodoro_time}>
                        {pomodoro.min}min {pomodoro.sec}sec
                    </div>
                )}
            </div>
        </section>
    );
};

export default Daily;
