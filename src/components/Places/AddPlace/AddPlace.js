import { useState, useEffect } from "react";
import styles from "./AddPlace.module.css";
import Section from "../../Section/Section";
import List from "../List/List";
import Snackbar from "../../Snackbar/Snackbar";

function AddPlace({ places, setPlaces }) {
    const [name, setName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ type: "success", message: "fff" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            // showAlert(true, "danger", "please enter value");
        } else if (name && isEditing) {
            setPlaces(
                places.map((item) => {
                    if (item.id === editID) {
                        return { ...item, name };
                    }
                    return item;
                })
            );
            setName("");
            setEditID(null);
            setIsEditing(false);
            // showAlert(true, "success", "value changed");
        } else {
            // showAlert(true, "success", "item added to the places");
            const newItem = {
                id: places.length,
                name,
            };

            setPlaces([...places, newItem]);
            setName("");
        }
    };

    const clearList = () => {
        // showAlert(true, "danger", "empty places");
        setPlaces([]);
    };

    const removeItem = (id) => {
        // showAlert(true, "danger", "item removed");
        setPlaces(places.filter((item) => item.id !== id));
    };

    const editItem = (id) => {
        const specificItem = places.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.name);
    };

    useEffect(() => {
        localStorage.setItem("places", JSON.stringify(places));
    }, [places]);

    const showAlert = (type, message) => {
        setAlert({ type, message });
    };

    return (
        <div>
            <Section title="Places">
                {/* <Snackbar
                    open={open}
                    setOpen={setOpen}
                    message={alert.message}
                    type={alert.message}
                /> */}

                <form className={styles["form"]} onSubmit={handleSubmit}>
                    <div className={styles["form-control"]}>
                        <input
                            type="text"
                            className={styles["input"]}
                            placeholder="e.g. Cinema"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit" className={styles["submit-btn"]}>
                            {isEditing ? "edit" : "submit"}
                        </button>
                    </div>
                </form>
                {places.length > 0 && (
                    <div className={styles["container"]}>
                        <List
                            items={places}
                            removeItem={removeItem}
                            editItem={editItem}
                        />
                        <button
                            className={styles["clear-btn"]}
                            onClick={clearList}
                        >
                            clear items
                        </button>
                    </div>
                )}
            </Section>
        </div>
    );
}

export default AddPlace;
