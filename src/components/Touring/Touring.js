import { useState } from "react";
import Section from "../Section/Section";
import AddVertex from "./AddVertex/AddVertex";
import styles from "./Touring.module.css";
import Table from "../Table/Table";
import { runTSP } from "../../utils/TSP";
import makeAdjMatrix, { makeIDMap } from "../../utils/makeAdjMatrix";

const createData = (row) => {
    return { ...row, name: row?.name };
};

const vertexSchema = { name: "", id: "" };

function Touring({ places, distances }) {
    const [vertexes, setVertexes] = useState([]);
    const [src, setSrc] = useState(vertexSchema);
    const [answer, setAnswer] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();

        let allVertexes = [src, ...vertexes];

        let mainAdjMatrix = makeAdjMatrix(distances, places.length);
        console.log(makeAdjMatrix(distances, places.length));

        let n = allVertexes.length;
        // Initialzing graph[][] with zeros
        let graph = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            graph[i] = new Array(n).fill(-1);
        }

        let map = {},
            vNo = 0;
        for (let i = 0; i < n; i++) {
            let item = allVertexes[i];
            if (!Boolean(map[item.id])) {
                map[item.id] = vNo;
                vNo++;
            }
        }

        for (let i = 0; i < places.length; i++) {
            let newId = map[i];

            for (let j = i; j < places.length; j++) {
                let newId2 = map[j];
                if (newId !== undefined && newId2 !== undefined) {
                    graph[newId2][newId] = graph[newId][newId2] =
                        mainAdjMatrix[i][j];
                }
            }
        }

        setAnswer(() => runTSP(graph, n));

        console.log(map);
        console.log(graph);
    };

    return (
        <Section title="Touring">
            <AddVertex
                places={places}
                distances={distances}
                vertexes={vertexes}
                setVertexes={setVertexes}
                src={src}
                setSrc={setSrc}
                vertexSchema={vertexSchema}
            />

            <div className="mt-10">
                <Table
                    columns={[
                        { id: "id", label: "ID", minWidth: 100 },
                        { id: "name", label: "Name", minWidth: 100 },
                    ]}
                    rows={vertexes.map((row) => createData(row))}
                />
            </div>

            <div className="mt-10">
                {answer !== -1 ? (
                    <span className="text-lg">
                        Tour Length: <b className="text-green-600">{answer}</b>
                    </span>
                ) : (
                    <span>select some node</span>
                )}
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
                <span>show tour</span>
            </button>
        </Section>
    );
}

export default Touring;
