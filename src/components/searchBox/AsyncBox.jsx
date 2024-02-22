import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const sleep = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

export default function AsyncBox({ onChange }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [pokedex, setPokedex] = useState(null);
  const loading = open && options.length === 0;

  const fetchPokedex = async () => {
    const URL = "https://pokeapi.co/api/v2/pokedex/1";

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setPokedex(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let active = true;

    if (!loading) return undefined;

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active && pokedex) {
        // Make sure pokedex data is available
        setOptions([...pokedex.pokemon_entries]); // Extract the array
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, pokedex]); // Include pokedex in the dependency array

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: 300,
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => {
          const pokemonNames = option.pokemon_species.name;
          return pokemonNames.charAt(0).toUpperCase() === value.pokemon_species.name.charAt(0).toUpperCase();
        }}
        getOptionLabel={(option) => {
          const pokemonName = option.pokemon_species.name;
          return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        }}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            onChange={onChange}
            {...params}
            label="Pokemon"
            onClick={fetchPokedex}
            sx={{ borderRadius: "0 0 1rem 1rem !important" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}
