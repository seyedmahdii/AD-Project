import { useState } from "react";
import ComboboxInput from "../../ComboboxInput/ComboboxInput";

function SelectDest({ places, vertexSchema, vertex, setVertex }) {
    return (
        <div>
            <div className="flex items-center">
                <div className="w-full">
                    <span>Destination:</span>
                    <div className="flex justify-between">
                        <ComboboxInput
                            selected={vertex}
                            setSelected={setVertex}
                            list={places}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectDest;
