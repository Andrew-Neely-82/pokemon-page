import { useEffect, useRef, useState } from "react";
import SearchBox from "../searchBox/SearchBox";
import { CircularProgress } from "@mui/material";
import { Locations, Moves, Stats, Types } from "./info/export";

const Main = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const soundRef = useRef(null);

  const playSound = (sound) => {
    if (soundRef.current) {
      soundRef.current.src = sound;
      soundRef.current.play();
    } else {
      return;
    }
  };
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <div className="main-container">
      <SearchBox pokemon={pokemon} setPokemon={setPokemon} setLoading={setLoading} />
      {loading && <CircularProgress />}
      {pokemon && !loading && (
        <>
          <h3>{`#${pokemon.id} ${upperCase(pokemon.name)}`}</h3>
          {pokemon.sprites.front_default && <img className="sprite front" src={pokemon.sprites.front_default} alt={`${pokemon.name}'s sprite`} title={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s sprite`} />} {pokemon.sprites.front_shiny && <img className="sprite front" src={pokemon.sprites.front_shiny} alt={`${pokemon.name}'s sprite`} title={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s sprite`} />}
          {/* <img className="sprite back" src={pokemon.sprites.back_default} alt={`${pokemon.name}'s sprite`} title={`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}'s sprite`} /> */}
          <audio ref={soundRef}>
            {pokemon.cries.latest && <source src={pokemon.cries.latest} type="audio/mpeg" />}
            {pokemon.cries.legacy && <source src={pokemon.cries.legacy} type="audio/mpeg" />}
            Your browser does not support the audio element.
          </audio>
          {pokemon.cries.legacy && <button onClick={() => playSound(pokemon.cries.legacy)}>Play legacy cry</button>}
          {pokemon.cries.latest && <button onClick={() => playSound(pokemon.cries.latest)}>Play latest cry</button>}
          <Types pokemon={pokemon} />
          <Stats pokemon={pokemon} />
          <Moves pokemon={pokemon} />
          <Locations pokemon={pokemon} />
          <section className="games-section">
            <div className="games-wrapper">
              <h4>Games</h4>
              <div className="games-container">
                {pokemon.game_indices.map((pokemon, key) => {
                  return (
                    <>
                      <span key={key}>{pokemon.game_indices}</span>
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Main;
