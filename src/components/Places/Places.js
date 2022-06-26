import AddPlace from "./AddPlace/AddPlace";

function Places({ places, setPlaces }) {
    return (
        <div>
            <AddPlace places={places} setPlaces={setPlaces} />
        </div>
    );
}

export default Places;
