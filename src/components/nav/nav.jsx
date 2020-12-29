import React from "react";
import styles from "./nav.module.css";

const Nav = ({ getMain, mainItem }) => {
    const getNavItem = name => {
        getMain(name);
    };

    const items = [
        { id: 0, name: "Calendar" },
        { id: 1, name: "Daily" },
        { id: 2, name: "Weekly" },
        { id: 3, name: "Monthly" }
    ];

    return (
        <nav className={styles.container}>
            <ul className={styles.navList}>
                {items.map(item => (
                    <li
                        key={item.id}
                        className={`${styles.item} ${item.name === mainItem && `${styles.selected}`}`}
                        onClick={() => getNavItem(item.name)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
