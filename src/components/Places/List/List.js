import React from "react";
import styles from "./List.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
    return (
        <div className={styles["list"]}>
            {items.map((item) => {
                const { id, name } = item;
                return (
                    <article className={styles["item"]} key={id}>
                        <p className={styles["title"]}>{name}</p>
                        <div className={styles["btn-container"]}>
                            <button
                                type="button"
                                className={styles["edit-btn"]}
                                onClick={() => editItem(id)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                type="button"
                                className={styles["delete-btn"]}
                                onClick={() => removeItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default List;
