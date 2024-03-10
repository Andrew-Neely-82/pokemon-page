import { useState } from "react";

const Locations = ({ pokemon }) => {
  const [locations, setLocations] = useState(null);
  const [games, setGames] = useState(null);

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

    if (locations.includes("Johto")) {
    }
  };

  const fetchGames = async () => {
    const URL = `https://pokeapi.co/api/v2/version/${pokemon.id}/`;
    if (!pokemon.id) return undefined;

    try {
      const res = await fetch(URL);
      const data = await res.json();
      console.log(data);
      setGames(data.name);
      console.log(URL)
      console.log(games);
    } catch (err) {
      console.error(err);
    }
  };

  const clearLocations = () => setLocations(null);

  return (
    <section className="locations-section">
      <h3>Possible locations</h3>
      <div>
        <button onClick={fetchLocation}>Load Locations</button>
        <button onClick={clearLocations}>Clear Locations</button>
      </div>
      {locations && locations.length > 0 ? (
        <div className={`locations-wrapper ${locations ? "" : "hidden"}`}>
          <div className="locations-container">
            {locations.map((location, index) => (
              <span key={index}>
                {
                  location.location_area.name.includes("Johto")
                  // .replaceAll("-", " ")
                  // .replaceAll("area", "")
                  // .replace("unknown all bugs", "All known bugs areas")
                }
              </span>
            ))}
          </div>
        </div>
      ) : (
        <span className={`${locations ? "" : "hidden"}`}>This pokemon has no encounter locations</span>
      )}
      <button onClick={fetchGames}>Press for games</button>
      {games ? <span>{games}</span> : ""}
    </section>
  );
};

export default Locations;

