import { useState, useEffect } from "react";
import ComboboxInput from "../../ComboboxInput/ComboboxInput";

function AddDistance({ places, distances, setDistances }) {
    const [from, setFrom] = useState({ name: "", id: "" });
    const [to, setTo] = useState({ name: "", id: "" });
    const [weight, setWeight] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!from.name || !to.name) {
            // showAlert(true, "danger", "please enter value");
        } else if (weight && isEditing) {
            setDistances(
                places.map((item) => {
                    if (item.id === editID) {
                        return { ...item, distance: weight };
                    }
                    return item;
                })
            );
            setWeight("");
            setEditID(null);
            setIsEditing(false);
            // showAlert(true, "success", "value changed");
        } else {
            // showAlert(true, "success", "item added to the places");
            const newItem = {
                id: new Date().getTime().toString(),
                distance: Number(weight),
                from: from,
                to: to,
            };

            setDistances([...distances, newItem]);
            setWeight("");
        }
    };

    useEffect(() => {
        localStorage.setItem("distances", JSON.stringify(distances));
    }, [distances]);

    return (
        <div>
            <div className="flex items-center">
                <div className="w-full">
                    <span>from</span>
                    <ComboboxInput
                        selected={from}
                        setSelected={setFrom}
                        list={places}
                    />
                </div>
                <div className="w-full">
                    <span>to</span>
                    <ComboboxInput
                        selected={to}
                        setSelected={setTo}
                        list={places}
                    />
                </div>
            </div>

            <input
                type="number"
                placeholder="e.g. 7"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-5"
                onClick={handleSubmit}
            >
                <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Submit</span>
            </button>
        </div>
    );
}

export default AddDistance;
