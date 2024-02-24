import { useState } from "react";

const Locations = ({ pokemon }) => {
  const [locations, setLocations] = useState(null);

  const fetchLocation = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters`;
    if (!pokemon.id) return undefined;

    try {
      const res = await fetch(URL);
      const data = await res.json();
      // Sort the locations alphabetically by name
      const sortedLocations = data.sort((a, b) => {
        return a.location_area.name.localeCompare(b.location_area.name);
      });
      setLocations(sortedLocations);
    } catch (error) {
      console.log(error);
    }
  };

  const clearLocations = () => {
    setLocations(null);
  };
  return (
    <section className="locations-section">
      <h3>Possible locations</h3>
      <div>
        <button onClick={fetchLocation}>Load Locations</button>
        <button onClick={clearLocations}>Clear Locations</button>
      </div>
      {locations ? (
        <div className="locations-wrapper">
          <div className="locations-container">{Array.isArray(locations) && locations.map((location, index) => <span key={index}>{location.location_area.name}</span>)}</div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
export default Locations;
