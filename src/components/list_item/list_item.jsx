import React, { useState } from "react";
import styles from "./list_item.module.css";

const ListItem = ({ list, deleteTask, update, finished }) => {
    const [finishTask, setFinishTask] = useState(true);

    const onSubmit = () => {
        deleteTask(list.id);
    };

    const onClick = () => {
        update(list);
    };

    const onCheckbox = () => {
        finishTask ? setFinishTask(false) : setFinishTask(true);

        list.finished = finishTask;

        finished(list);
    };

    return (
        <section className={styles.container}>
            <div className={styles.list}>
                <div className={styles.front}>
                    <label className={styles.checkbox}>
                        {list.finished ? <input type="checkbox" onClick={onCheckbox} checked /> : <input type="checkbox" onClick={onCheckbox} />}
                        <span className={styles.checkMark}></span>
                    </label>
                </div>
                <div className={styles.mid}>
                    <div className={styles.box_top}>
                        <p className={styles.list_value}>{list.task}</p>
                        <div className={styles.edit} onClick={onClick}>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>
                    <div className={styles.box_bottom}>
                        <div className={styles.pomodoro}>
                            <div className={styles.title}>
                                <span>P</span>
                            </div>
                            <div className={styles.timer}>
                                <span>00:00</span>
                            </div>
                            <ul className={styles.timer_controler}>
                                <li>
                                    <i className="fas fa-sort-up"></i>
                                </li>
                                <li>
                                    <i className="fas fa-sort-down"></i>
                                </li>
                                <li>
                                    <i className="fas fa-play"></i>
                                </li>
                                <li>
                                    <i className="fas fa-stop"></i>
                                </li>
                            </ul>
                        </div>
                        <ul className={styles.info_list}>
                            <li className={styles.category}>{list.category}</li>
                            <li className={styles.priority}>{list.priority}</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.end} onClick={onSubmit}>
                    <span>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ListItem;
