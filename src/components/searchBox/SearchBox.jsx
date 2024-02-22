import { useAutocomplete } from "@mui/base/useAutocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AsyncBox from "./AsyncBox";

const SearchBox = ({ onClick }) => {
  const [pokemon, setPokemon] = useState(null);

  const handleClick = () => {
    let input = document.getElementById("asynchronous-demo");
    let lowerInput = input.value.toLowerCase();

    console.log(lowerInput);
    setPokemon(input.value);
    const fetchPokemon = async () => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${lowerInput}`;

      try {
        console.log(URL);
        const res = await fetch(URL);
        const data = await res.json();
        setPokemon(data);
        console.log(data);
        setPokemon(null);
      } catch (error) {
        console.error(error);
        console.log(URL);
      }
    };
    fetchPokemon();
    setPokemon(null);
  };

  return (
    <div className="search-container">
      <AsyncBox />
      <button type="submit" onClick={handleClick}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBox;
