import Section from "../Section/Section";
import AddDistance from "./AddDistance/AddDistance";
import styles from "./Distances.module.css";
import Table from "../Table/Table";

const createData = (row) => {
    return { ...row, from: row?.from?.name, to: row?.to?.name };
};

function Distances({ places, distances, setDistances }) {
    return (
        <Section title="Distances">
            <AddDistance
                places={places}
                distances={distances}
                setDistances={setDistances}
            />

            <div className="mt-10">
                <Table
                    columns={[
                        { id: "from", label: "From", minWidth: 100 },
                        { id: "to", label: "To", minWidth: 100 },
                        { id: "distance", label: "Distance", minWidth: 100 },
                    ]}
                    rows={distances.map((row) => createData(row))}
                />
            </div>

            {/* {distances.length > 0 && (
                <div className={styles["container"]}>
                    <List
                        items={distances}
                        // removeItem={removeItem}
                        // editItem={editItem}
                    />
                    <button
                        className={styles["clear-btn"]}
                        //  onClick={clearList}
                    >
                        clear items
                    </button>
                </div>
            )} */}
        </Section>
    );
}

export default Distances;
