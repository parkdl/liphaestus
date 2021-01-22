import React, { useCallback, useEffect, useState } from "react";
import styles from "./daily.module.css";
import { Doughnut } from "react-chartjs-2";

const Daily = ({ lists }) => {
    const [list, setList] = useState([]);

    const [pomodoro, setPomodoro] = useState({
        min: 0,
        sec: 0
    });

    const [dailyChart, setDailyChart] = useState({ data: {}, options: {} });

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

        const finish_percent = parseInt((checkTask / list.length) * 100);
        const remaining = 100 - finish_percent;

        const data = {
            labels: ["Finished", "Remaining"],
            datasets: [
                {
                    data: [finish_percent, remaining],
                    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                    hoverBackgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"]
                }
            ]
        };

        const options = {
            responsive: true,
            tooltips: {
                displayColors: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return `${data["labels"][tooltipItem["index"]]} : ${data["datasets"][0]["data"][tooltipItem["index"]]}% `;
                    }
                }
            }
        };

        setDailyChart({
            data,
            options
        });
    }, [list]);

    useEffect(() => {
        let listArray = [];
        Object.keys(lists).map(list => listArray.push(lists[list]));

        setList(listArray);

        getPomodoroTime();
    }, [getPomodoroTime, lists]);

    useEffect(() => {
        getFinishTask();
    }, [getFinishTask]);

    return (
        <section className={styles.daily_container}>
            <div className={styles.wholeBox}>
                <div className={styles.container}>
                    <h2 className={styles.header}>Finished Task</h2>
                    <div className={styles.finished_main}>
                        <Doughnut data={dailyChart.data} options={dailyChart.options} />
                    </div>
                </div>

                <div className={styles.container}>
                    <h2 className={styles.header}>Pomodoro Time</h2>

                    <div className={styles.pomodoro_time}>
                        {pomodoro.min}min {pomodoro.sec}sec
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Daily;
