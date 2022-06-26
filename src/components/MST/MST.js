import { useState } from "react";
import Section from "../Section/Section";
import AddVertex from "./AddVertex/AddVertex";
import Table from "../Table/Table";
import makeAdjMatrix, {
    getVertexFromId,
    makeIDMap,
} from "../../utils/makeAdjMatrix";
import primMST from "../../utils/prim-MST";
import objectFlip from "../../utils/objectFlip";

const createData = (row) => {
    return { ...row, name: row?.name };
};

const vertexSchema = { name: "", id: "" };

function MST({ places, distances }) {
    const [vertexes, setVertexes] = useState([]);
    const [results, setResults] = useState([]);
    const [vMap, setVMap] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let mainAdjMatrix = makeAdjMatrix(distances, places.length);
        console.log(makeAdjMatrix(distances, places.length));

        let n = vertexes.length;
        // Initialzing graph[][] with zeros
        let graph = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            graph[i] = new Array(n).fill(-1);
        }

        let map = {},
            vNo = 0;
        for (let i = 0; i < n; i++) {
            let item = vertexes[i];
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

        setResults(() => primMST(graph, n));
        setVMap(() => objectFlip(map));
    };

    return (
        <Section title="MST">
            <AddVertex
                places={places}
                distances={distances}
                vertexes={vertexes}
                setVertexes={setVertexes}
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
                {results.length !== 0 ? (
                    <div>
                        <span className="text-lg">
                            <b className="text-green-600">Paths:</b>
                        </span>
                        <ul className="list-disc">
                            {results.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <b>
                                            {
                                                getVertexFromId(
                                                    places,
                                                    Number(vMap[item.from])
                                                ).name
                                            }
                                        </b>{" "}
                                        to{" "}
                                        <b>
                                            {
                                                getVertexFromId(
                                                    places,
                                                    Number(vMap[item.to])
                                                ).name
                                            }
                                        </b>{" "}
                                        &nbsp; ({item.distance})
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <span className="text-lg text-red-600">
                        <b>select some node!!</b>
                    </span>
                )}
            </div>

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
                <span>show MST</span>
            </button>
        </Section>
    );
}

export default MST;
