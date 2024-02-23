import { useEffect, useState } from "react";
import SearchBox from "../searchBox/SearchBox";
import { CircularProgress } from "@mui/material";
import { Moves, Stats, Types } from "./info/export";

const Main = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);

  const sleep = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  useEffect(() => {
    let active = true;

    const fetchPokemon = async () => {
      if (!pokemon) return;
      setLoading(true);
      await sleep(1e3);

      if (active && pokemon) {
        setLoading(false);
      }
    };

    fetchPokemon();

    return () => {
      active = false;
    };
  }, [pokemon]);

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

  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <div className="main-container">
      <SearchBox pokemon={pokemon} setPokemon={setPokemon} setLoading={setLoading} />
      {loading && <CircularProgress />}
      {pokemon && !loading && (
        <>
          <h3>{`#${pokemon.id} ${upperCase(pokemon.name)}`}</h3>
          <img className="sprite front" src={pokemon.sprites.front_default} alt={`${pokemon.name}'s sprite`} title={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s sprite`} />
          <img className="sprite back" src={pokemon.sprites.back_default} alt={`${pokemon.name}'s sprite`} title={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s sprite`} />
          <Types pokemon={pokemon} />
          <Stats pokemon={pokemon} />
          <Moves pokemon={pokemon} />
        </>
      )}
      <button onClick={fetchLocation}>press for locations</button>
      <button onClick={clearLocations}>Clear Locations</button>
      <div>{Array.isArray(locations) && locations.map((location, index) => <div key={index}>{location.location_area.name}</div>)}</div>
    </div>
  );
};

export default Main;
