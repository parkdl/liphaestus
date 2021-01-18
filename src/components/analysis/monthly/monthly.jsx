import React, { useCallback, useEffect, useState } from "react";
import styles from "./monthly.module.css";
import { Doughnut, Pie } from "react-chartjs-2";

const Monthly = ({ lists }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [destructuring, setDestructuring] = useState([]);
    const [selected, setSelected] = useState();
    const [totalTask, setTotalTask] = useState({
        total: 0,
        finishTask: 0,
        remainder: 0
    });
    const [pomodoroTime, setPomodoroTime] = useState({
        min: 0,
        sec: 0
    });
    const [defaultChart, setDefaultChart] = useState({ data: {}, options: {} });
    const [chartData, setChartData] = useState({ data: {}, options: {} });

    const showContent = () => {
        setShowDropdown(!showDropdown);
    };

    const getDefaultChart = useCallback(() => {
        const percent = parseInt((totalTask.finishTask / totalTask.total) * 100);
        const remainder = 100 - percent;

        const data = {
            labels: ["finished", "remainder"],
            datasets: [
                {
                    data: [percent, remainder],
                    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                    hoverBackgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"]
                }
            ]
        };

        const options = {
            responsive: false,
            tooltips: {
                displayColors: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return `${data["labels"][tooltipItem["index"]]} : ${data["datasets"][0]["data"][tooltipItem["index"]]}% `;
                    }
                }
            }
        };

        setDefaultChart({
            data,
            options
        });
    }, [totalTask.finishTask, totalTask.total]);

    const displayCategoryChart = task => {
        const workData = parseInt((task.work / totalTask.total) * 100);
        const studyData = parseInt((task.study / totalTask.total) * 100);
        const hobbyData = parseInt((task.hobby / totalTask.total) * 100);
        const etcData = parseInt((task.etc / totalTask.total) * 100);
        const remaining = 100 - (workData + studyData + hobbyData + etcData);

        const data = {
            labels: ["Work", "Study", "Hobby", "ETC", "Remaining"],
            datasets: [
                {
                    data: [workData, studyData, hobbyData, etcData, remaining],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(183, 82, 82, 0.2)"
                    ],
                    hoverBackgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(183, 82, 82, 0.2)"
                    ]
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

        setChartData({
            data,
            options
        });
    };

    const getCategoryTask = () => {
        let categoryItem = {
            work: 0,
            study: 0,
            hobby: 0,
            etc: 0
        };
        destructuring.forEach(list => list.finished && categoryItem[list.category]++);

        displayCategoryChart(categoryItem);
    };

    const displayPriorityChart = task => {
        const first = parseInt((task["1st"] / totalTask.total) * 100);
        const second = parseInt((task["2nd"] / totalTask.total) * 100);
        const third = parseInt((task["3rd"] / totalTask.total) * 100);
        const forth = parseInt((task["4th"] / totalTask.total) * 100);
        const remaining = 100 - (first + second + third + forth);

        const data = {
            labels: ["1st", "2nd", "3rd", "4th", "Remaining"],
            datasets: [
                {
                    data: [first, second, third, forth, remaining],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(183, 82, 82, 0.2)"
                    ],
                    hoverBackgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(183, 82, 82, 0.2)"
                    ]
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

        setChartData({
            data,
            options
        });
    };

    const getPriorityTask = () => {
        let priorityItem = {
            "1st": 0,
            "2nd": 0,
            "3rd": 0,
            "4th": 0
        };

        destructuring.forEach(list => list.finished && priorityItem[list.priority]++);
        displayPriorityChart(priorityItem);
    };
    console.log(pomodoroTime);
    const getPomodoroTask = useCallback(() => {
        let timeArray = [];
        let total = 0;

        Object.keys(destructuring).map(list => timeArray.push(destructuring[list].time));

        timeArray.forEach(time => (total += time));

        const min = parseInt(total / 60);
        const sec = total % 60;

        setPomodoroTime({
            min,
            sec
        });
    }, [destructuring]);

    const getSelected = value => {
        if (value === "category" || value === "priority") setShowDropdown(!showDropdown);
        if (value === "pomodoro") setShowDropdown(false);
        setSelected(value);
        value === "category" && getCategoryTask();
        value === "priority" && getPriorityTask();
        value === "pomodoro" && getPomodoroTask();
    };

    useEffect(() => {
        let taskArray = [];
        let done = 0;
        Object.keys(lists).map(task =>
            Object.keys(lists[task]).map(item => Object.keys(lists[task][item]).map(value => taskArray.push(lists[task][item][value])))
        );

        taskArray.forEach(task => task.finished && done++);

        setTotalTask({
            total: taskArray.length,
            finishTask: done,
            remainder: taskArray.length - done
        });

        setDestructuring(taskArray);
    }, [lists]);
    console.log(destructuring);
    useEffect(() => {
        getDefaultChart();
        setSelected("pomodoro");
        getPomodoroTask();
    }, [getDefaultChart, getPomodoroTask]);

    return (
        <section className={styles.container}>
            <div className={styles.controler}>
                <div className={styles.dropdown}>
                    <button className={styles.finished} onClick={showContent}>
                        Finished Task
                    </button>
                    <ul className={`${styles.dropdown_contents} ${showDropdown ? `${styles.show_dropdown}` : null}`}>
                        <li onClick={() => getSelected("category")}>Category</li>
                        <li onClick={() => getSelected("priority")}>Priority</li>
                    </ul>
                </div>
                <button className={styles.pomodoro} onClick={() => getSelected("pomodoro")}>
                    Pomodoro Time
                </button>
            </div>
            <div className={styles.main}>
                <div className={styles.default}>
                    <h2>Total</h2>
                    <div className={styles.chart}>
                        <Doughnut data={defaultChart.data} options={defaultChart.options} />
                    </div>
                </div>
                <div className={styles.mainChart}>
                    <h2>Main - {selected}</h2>
                    <div className={styles.chart}>
                        {selected === "category" && <Pie data={chartData.data} options={chartData.options} />}
                        {selected === "priority" && <Pie data={chartData.data} options={chartData.options} />}
                        {selected === "pomodoro" && (
                            <div className={styles.pomodoro_time}>
                                {pomodoroTime.min}min {pomodoroTime.sec}sec
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Monthly;
