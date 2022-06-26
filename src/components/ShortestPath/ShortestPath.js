import { useState } from "react";
import Section from "../Section/Section";
import makeAdjMatrix, {
    getVertexFromId,
    makeIDMap,
} from "../../utils/makeAdjMatrix";
import SelectDest from "./SelectDest/SelectDest";
import dijkstra from "../../utils/shortestPath";

const vertexSchema = { name: "", id: "" };

function ShortestPath({ places, distances }) {
    const [result, setResult] = useState([]);
    const [vertex, setVertex] = useState(vertexSchema);

    const handleSubmit = (e) => {
        e.preventDefault();

        let mainAdjMatrix = makeAdjMatrix(distances, places.length);

        // ID of parking is 5
        let results = dijkstra(mainAdjMatrix, 5);
        setResult(() =>
            results.find((item) => {
                if (item.to === vertex.id) {
                    return item;
                }
            })
        );
    };

    return (
        <Section title="Shortest paths">
            <SelectDest
                places={places}
                vertexSchema={vertexSchema}
                vertex={vertex}
                setVertex={setVertex}
            />

            <div className="mt-10">
                {result.distance !== undefined && (
                    <div>
                        <div className="text-lg">
                            <b className="text-green-600">
                                Length: {result.distance}
                            </b>
                        </div>
                        <span className="text-lg">
                            <b className="text-green-600">Paths:</b>
                        </span>
                        <ol className="list-decimal">
                            {result?.path?.map((v, i) => {
                                return (
                                    <li key={i}>
                                        <b>{getVertexFromId(places, v).name}</b>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
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
                <span>show shortest paths</span>
            </button>
        </Section>
    );
}

export default ShortestPath;
