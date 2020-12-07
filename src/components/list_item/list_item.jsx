import React from "react";
import styles from "./list_item.module.css";

const ListItem = props => {
    return (
        <section className={styles.container}>
            <div className={styles.list}>
                <div className={styles.front}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.checkMark}></span>
                    </label>
                </div>
                <div className={styles.mid}>
                    <div className={styles.box_top}>
                        <p className={styles.list_value}>'userId' is assigned a value but never used. seakthksdklfsl sdkl</p>
                        <div className={styles.edit}>
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
                            <li className={styles.category}>C</li>
                            <li className={styles.priority}>1</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.end}>
                    <span>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ListItem;
