import { TabPanel } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Cards } from "../main/info/export";

const PokemonCards = ({ style , pokemon}) => {
  const generation_RANGES = {
    "Generation 1": { start: 1, end: 151 },
    "Generation 2": { start: 152, end: 251 },
    "Generation 3": { start: 252, end: 386 },
    "Generation 4": { start: 387, end: 493 },
    "Generation 5": { start: 494, end: 649 },
    "Generation 6": { start: 650, end: 721 },
    "Generation 7": { start: 722, end: 809 },
    "Generation 8": { start: 810, end: 905 },
    "Generation 9": { start: 906, end: 1025 },
    // Add more generations as necessary
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <TabPanel value="1" sx={{ flexDirection: "column" }}>
        {Object.keys(generation_RANGES).map((generationKey) => {
          // Filter Pokémon for the current generation
          const generationPokemon = pokemon.filter((poke) => {
            const pokeIndex = pokemon.indexOf(poke) + 1;
            return pokeIndex >= generation_RANGES[generationKey].start && pokeIndex <= generation_RANGES[generationKey].end;
          });
          // Render generation banner and its Pokémon if there are any Pokémon in the generation
          if (generationPokemon.length > 0) {
            return (
              <React.Fragment key={generationKey}>
                <h1>{generationKey}</h1>
                <div className="cards-wrapper">
                  {generationPokemon.map((poke, index) => {
                    return <Cards pokemon={poke} key={poke.id} />;
                  })}
                </div>
              </React.Fragment>
            );
          }
          return null; // In case there are no Pokémon for this generation
        })}
      </TabPanel>
      <div id="pokemon-sentinel" />
    </Suspense>
  );
};
export default PokemonCards;
