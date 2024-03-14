import { GameVersions, PokemonCards, SearchTab } from "./tabs/export";
import React, { Suspense, useEffect, useState } from "react";
import { Box, CircularProgress, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

export default function Navbar() {
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=20`;
  const [value, setValue] = React.useState("1");
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(URL); // Start with the first page
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    if (!nextUrl) return;
    setLoading(true);

    try {
      const pokemonRes = await fetch(nextUrl);
      const pokemonJSON = await pokemonRes.json();
      setPokemon((loading) => [...loading, ...pokemonJSON.results]);
      setNextUrl(pokemonJSON.next);
    } catch (error) {
      console.error("Failed to fetch Pokemon:", error);
    }
    setLoading(false);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextUrl]); // Re-create the observer when nextUrl changes

  const handleChange = (event, newValue) => setValue(newValue);

  const styling = {
    listProps: {
      onChange: handleChange,
      sx: {
        borderRadius: "0.5rem 0.5rem 0 0",
        width: "fit-content",
        background: "white",
      },
    },
    tabStylingtabStyling: {
      sx: {
        background: "white",
        fontWeight: "600",
      },
    },
    panelStyling: {
      sx: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        maxWidth: "100rem",
        margin: "auto",
      },
    },
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList {...styling.listProps} aria-label="tab">
            <Tab label="All Pokemon" value="1" {...styling.tabStyling} />
            <hr />
            <Tab label="Search" value="2" {...styling.tabStyling} />
            <hr />
            <Tab label="Games" value="3" {...styling.tabStyling} />
          </TabList>
        </Box>
        <Suspense fallback={<CircularProgress />}>
          <PokemonCards style={styling.panelStyling.sx} pokemon={pokemon} loading={loading} />
        </Suspense>
        <SearchTab style={styling.panelStyling.sx} />
        <GameVersions style={styling.panelStyling.sx} />
      </TabContext>
    </Box>
  );
}
