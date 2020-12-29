import React, { useEffect, useState, useCallback } from "react";
import styles from "./pomodoro.module.css";

const Pomodoro = ({ getTime }) => {
    const [pomodoroTime, setPomodoroTime] = useState({
        total: 0,
        min: "0",
        sec: "0"
    });
    const [saveTotalTime, setSaveTotalTime] = useState(null);

    const [status, setStatus] = useState(false);
    const [pause, setPause] = useState(false);

    const upTime = () => {
        const upper = pomodoroTime.total + 300;

        const min = parseInt(upper / 60);

        upper <= 3000
            ? setPomodoroTime({
                  total: upper,
                  min,
                  sec: "0"
              })
            : setPomodoroTime({
                  total: 0,
                  min: "0",
                  sec: "0"
              });
    };

    const downTime = () => {
        const down = pomodoroTime.total - 300;
        const min = parseInt(down / 60);

        down >= 0
            ? setPomodoroTime({
                  total: down,
                  min,
                  sec: "0"
              })
            : setPomodoroTime({
                  total: 3000,
                  min: "50",
                  sec: "0"
              });
    };

    const startTimer = () => {
        setSaveTotalTime(pomodoroTime.total);
        setStatus(true);
        setPause(true);
    };

    const stopTimer = useCallback(() => {
        const remainTime = saveTotalTime - pomodoroTime.total;

        getTime(remainTime);

        setStatus(false);
        setPause(false);
        setPomodoroTime({
            total: 0,
            min: "0",
            sec: "0"
        });
    }, [getTime, pomodoroTime.total, saveTotalTime]);

    const pauseTimer = () => {
        setPause(false);
        setStatus(false);
    };

    useEffect(() => {
        let setTimer = null;
        let time = pomodoroTime.total;

        if (status) {
            setTimer = setInterval(() => {
                time--;
                const min = parseInt(time / 60);
                const sec = time % 60;

                setPomodoroTime({
                    total: time,
                    min: min,
                    sec: sec
                });
            }, 1000);

            time === 0 && stopTimer();
        } else if (!status && time !== 0) {
            clearInterval(setTimer);
        }
        return () => clearInterval(setTimer);
    }, [getTime, pomodoroTime.total, saveTotalTime, status, stopTimer]);

    return (
        <div className={styles.pomodoro}>
            <div className={styles.title}>
                <span>P</span>
            </div>
            <div className={styles.timer}>
                <span>
                    {pomodoroTime.min < 10 ? `0${pomodoroTime.min}` : `${pomodoroTime.min}`}:
                    {pomodoroTime.sec < 10 ? `0${pomodoroTime.sec}` : `${pomodoroTime.sec}`}
                </span>
            </div>
            <ul className={styles.timer_controler}>
                <li onClick={upTime}>
                    <i className="fas fa-sort-up"></i>
                </li>
                <li onClick={downTime}>
                    <i className="fas fa-sort-down"></i>
                </li>
                {pause && (
                    <li onClick={pauseTimer}>
                        <i className="fas fa-pause"></i>
                    </li>
                )}
                {!pause && (
                    <li onClick={startTimer}>
                        <i className="fas fa-play"></i>
                    </li>
                )}

                <li onClick={stopTimer}>
                    <i className="fas fa-stop"></i>
                </li>
            </ul>
        </div>
    );
};

export default Pomodoro;
