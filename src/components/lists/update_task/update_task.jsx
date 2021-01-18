import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styles from "./update_task.module.css";

const UpdataTask = ({ visible, addTask, list }) => {
    const selectOption = {
        category: {
            items: [
                { id: 1, name: "Work", data: "work" },
                { id: 2, name: "Study", data: "study" },
                { id: 3, name: "Hobby", data: "hobby" },
                { id: 4, name: "ETC", data: "etc" }
            ]
        },
        priority: {
            items: [
                { id: 5, name: "1st" },
                { id: 6, name: "2nd" },
                { id: 7, name: "3rd" },
                { id: 8, name: "4th" }
            ]
        }
    };

    const [categoryItem, setCategoryItem] = useState({});
    const [priorityItem, setPriorityItem] = useState({});

    const taskRef = useRef();
    const formRef = useRef();

    const onSubmit = event => {
        event.preventDefault();

        const dayTask = {
            id: list.id,
            task: taskRef.current.value || null,
            category: categoryItem.name || null,
            priority: priorityItem.name || null,
            finished: list.finished,
            time: list.time
        };

        formRef.current.reset();
        setCategoryItem({});
        setPriorityItem({});

        if (dayTask.task === null || dayTask.category === null || dayTask.priority === null) {
            alert("빈 칸을 채워주세요");
        } else {
            addTask(dayTask);
        }
    };

    const selectCategory = item => {
        setCategoryItem({
            name: item.data
        });
    };

    const selectPriority = item => {
        setPriorityItem({
            name: item.name
        });
    };

    useEffect(() => {
        setCategoryItem({
            name: list.category
        });
        setPriorityItem({
            name: list.priority
        });
    }, [list.category, list.priority]);

    return (
        <section className={`${styles.container} ${styles[visible]}`}>
            <h1 className={styles.title}>Update Task</h1>
            <form ref={formRef} className={styles.add_task_form}>
                <div className={styles.add_task}>
                    <input ref={taskRef} type="text" placeholder="Add Task..." defaultValue={list.task} />
                </div>
                <div className={styles.add_option}>
                    <h2>Category</h2>
                    <ul className={`${styles.lists} ${styles.category}`}>
                        {selectOption.category.items.map(item => (
                            <li
                                key={item.id}
                                id={item.id}
                                className={`${styles.item} ${categoryItem.name === item.name && `${styles.selected}`} `}
                                onClick={() => selectCategory(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.add_option}>
                    <h2>Priority</h2>
                    <ul className={`${styles.lists} ${styles.priority}`}>
                        {selectOption.priority.items.map(item => (
                            <li
                                key={item.id}
                                id={item.id}
                                className={`${styles.item} ${priorityItem.name === item.name && `${styles.selected}`}`}
                                onClick={() => selectPriority(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.add_btn} onClick={onSubmit}>
                    <button>Update</button>
                </div>
            </form>
        </section>
    );
};

export default UpdataTask;