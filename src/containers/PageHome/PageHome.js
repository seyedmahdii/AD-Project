import React, { useState } from "react";
import Distances from "../../components/Distances/Distances";
import MST from "../../components/MST/MST";
import Places from "../../components/Places/Places";
import ShortestPath from "../../components/ShortestPath/ShortestPath";
import Touring from "../../components/Touring/Touring";
import { getLocalStorage } from "../../utils/localStorage";

function PageHome() {
    const [places, setPlaces] = useState(getLocalStorage("places"));
    const [distances, setDistances] = useState(getLocalStorage("distances"));

    return (
        <div>
            <div className="flex flex-col items-center lg:items-start lg:flex-row">
                <div className="flex-1">
                    <Places places={places} setPlaces={setPlaces} />
                    <ShortestPath
                        places={places}
                        distances={distances}
                        setDistances={setDistances}
                    />
                    <MST
                        places={places}
                        distances={distances}
                        setDistances={setDistances}
                    />
                </div>
                <div className="flex-1">
                    <Distances
                        places={places}
                        distances={distances}
                        setDistances={setDistances}
                    />

                    <Touring
                        places={places}
                        distances={distances}
                        setDistances={setDistances}
                    />
                </div>
            </div>
        </div>
    );
}

export default PageHome;
