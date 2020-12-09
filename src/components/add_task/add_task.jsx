import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styles from "./add_task.module.css";

const AddTask = ({ visible, addTask }) => {
    const selectOption = {
        category: {
            items: [
                { id: 1, name: "Work" },
                { id: 2, name: "Study" },
                { id: 3, name: "Hobby" },
                { id: 4, name: "ETC" }
            ]
        },
        priority: {
            items: [
                { id: 5, name: "1" },
                { id: 6, name: "2" },
                { id: 7, name: "3" },
                { id: 8, name: "4" }
            ]
        }
    };

    const [categoryId, setCategoryId] = useState();
    const [priorityId, setPriorityId] = useState();

    const taskRef = useRef();
    const formRef = useRef();

    const onSubmit = event => {
        event.preventDefault();

        const dayTask = {
            id: Date.now(),
            task: taskRef.current.value || "",
            category: categoryId || "",
            priority: priorityId || ""
        };

        formRef.current.reset();
        setCategoryId(null);
        setPriorityId(null);
        addTask(dayTask);
    };

    const selectCategory = id => {
        setCategoryId(id);
    };

    const selectPriority = id => {
        setPriorityId(id);
    };

    return (
        <section className={`${styles.container} ${styles[visible]}`}>
            <h1 className={styles.title}>Add Task</h1>
            <form ref={formRef} className={styles.add_task_form}>
                <div className={styles.add_task}>
                    <input ref={taskRef} type="text" placeholder="Add Task..." />
                </div>
                <div className={styles.add_option}>
                    <h2>Category</h2>
                    <ul className={`${styles.lists} ${styles.category}`}>
                        {selectOption.category.items.map(item => (
                            <li
                                key={item.id}
                                value={item.id}
                                id={item.id}
                                className={`${styles.item} ${categoryId === item.id && `${styles.selected}`}`}
                                onClick={() => selectCategory(item.id)}
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
                                value={item.id}
                                id={item.id}
                                className={`${styles.item} ${priorityId === item.id && `${styles.selected}`}`}
                                onClick={() => selectPriority(item.id)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.add_btn} onClick={onSubmit}>
                    <button>Add</button>
                </div>
            </form>
        </section>
    );
};

export default AddTask;
