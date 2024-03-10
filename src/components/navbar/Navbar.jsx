import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Cards } from "../main/info/export";
import { Box, CircularProgress, Grow, Tab } from "@mui/material";
import { Main } from "../export";
import React, { Suspense, useEffect, useState } from "react";

export default function Navbar() {
  const [value, setValue] = React.useState("1");
  const [pokemon, setPokemon] = useState([]);
  const [description, setDescription] = useState(null);
  const [nextUrl, setNextUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=51`); // Start with the first page
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    if (!nextUrl) return;
    setLoading(true);

    try {
      const pokemonRes = await fetch(nextUrl);
      const pokemonJSON = await pokemonRes.json();
      setPokemon((prev) => [...prev, ...pokemonJSON.results]);
      setNextUrl(pokemonJSON.next);
    } catch (error) {
      console.error("Failed to fetch Pokemon:", error);
    }
    setLoading(false);
  };

  // const fetchDescription = async () => {
  //   const URL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`;
  //   const res = await fetch(URL);
  //   const data = await res.json();
  //   console.log("description data\n", data);
  //   setDescription(data.flavor_text_entries[0].flavor_text.replaceAll("", " ").replaceAll("POKéMON", "Pokémon"));
  // };

  // useEffect(() => {
  //   fetchPokemon();
  //   // fetchDescription();
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPokemon();
        }
      },
      { threshold: 1.0 },
    );

    // Observe the sentinel element
    const sentinel = document.getElementById("pokemon-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [nextUrl]); // Re-create the observer when nextUrl changes

  const handleChange = (event, newValue) => setValue(newValue);

  const listProps = {
    onChange: handleChange,
    sx: {
      borderRadius: "0.5rem 0.5rem 0 0",
      width: "fit-content",
      background: "white",
    },
  };
  const tabStyling = {
    sx: {
      background: "white",
      fontWeight: "600",
    },
  };
  const panelStyling = {
    sx: {
      display: "flex",
      justifyContent: "center",
      position: "relative",
    },
  };

  const REGION_RANGES = {
    "Generation 1": { start: 1, end: 151 },
    "Generation 2": { start: 152, end: 251 },
    "Generation 3": { start: 252, end: 386 },
    "Generation 4": { start: 387, end: 493 },
    "Generation 5": { start: 494, end: 649 },
    "Generation 6": { start: 650, end: 721 },
    "Generation 7": { start: 722, end: 809 },
    "Generation 8": { start: 810, end: 905 },
    "Generation 9": { start: 906, end: 1025 },
    // Add more regions as necessary
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList {...listProps} aria-label="tab">
            <Tab label="All Pokemon" value="1" {...tabStyling} />
            <hr />
            <Tab label="Search" value="2" {...tabStyling} />
            <hr />
            <Tab label="Games" value="3" {...tabStyling} />
          </TabList>
        </Box>
        <Suspense fallback={<CircularProgress />}>
          <TabPanel value="1" {...panelStyling} sx={{ flexDirection: "column" }}>
            {Object.keys(REGION_RANGES).map((regionKey) => {
              // Filter Pokémon for the current region
              const regionPokemon = pokemon.filter((poke) => {
                const pokeIndex = pokemon.indexOf(poke) + 1;
                return pokeIndex >= REGION_RANGES[regionKey].start && pokeIndex <= REGION_RANGES[regionKey].end;
              });
              // Render region banner and its Pokémon if there are any Pokémon in the region
              if (regionPokemon.length > 0) {
                return (
                  <React.Fragment key={regionKey}>
                    <h1>{regionKey}</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
                      {regionPokemon.map((poke, index) => {
                        return (
                          <div key={poke.id}>
                            <Cards pokemon={poke} />
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              }
              return null; // In case there are no Pokémon for this region
            })}
            <div id="pokemon-sentinel" />
          </TabPanel>
        </Suspense>

        <TabPanel value="2" {...panelStyling}>
          <Main />
        </TabPanel>
        <TabPanel value="3" {...panelStyling}>
          All Game Versions
        </TabPanel>
      </TabContext>
    </Box>
  );
}
