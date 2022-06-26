import { useState, useEffect } from "react";
import ComboboxInput from "../../ComboboxInput/ComboboxInput";

function AddVertex({
    places,
    distances,
    vertexes,
    setVertexes,
    src,
    setSrc,
    vertexSchema,
}) {
    const [vertex, setVertex] = useState(vertexSchema);

    const addVertexHandler = () => {
        if (!vertex.name) {
            alert("Select a vertext");
        } else {
            // showAlert(true, "success", "item added to the places");
            setVertexes([...vertexes, vertex]);
            setVertex(vertexSchema);
        }
    };

    useEffect(() => {
        localStorage.setItem("distances", JSON.stringify(distances));
    }, [distances]);

    return (
        <div>
            <div className="flex items-center">
                <div className="w-full">
                    <span>src</span>
                    <ComboboxInput
                        selected={src}
                        setSelected={setSrc}
                        list={places}
                    />
                </div>
                <div className="w-full">
                    <span>vertexes</span>
                    <div className="flex justify-between">
                        <ComboboxInput
                            selected={vertex}
                            setSelected={setVertex}
                            list={places}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={addVertexHandler}
                        >
                            add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVertex;
