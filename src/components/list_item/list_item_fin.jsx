import React from "react";
import styles from "./list_item_fin.module.css";

const ListItemFin = ({ list }) => {
    return (
        <section className={styles.container}>
            <div className={styles.list}>
                <div className={styles.front}>
                    <label className={styles.checkbox}>
                        {/* {list.finished ? <input type="checkbox" checked /> : <input type="checkbox" />} */}
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
                                <span>00:00</span>
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
