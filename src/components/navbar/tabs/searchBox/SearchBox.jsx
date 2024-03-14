import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import AsyncBox from "./AsyncBox";

const SearchBox = ({ pokemon, setPokemon }) => {
  //
  const handleClick = () => {
    let input = document.getElementById("asynchronous-demo");
    let lowerInput = input.value.toLowerCase();
    pokemon = lowerInput;

    if (!pokemon) return;
    setPokemon(input.value);
    const fetchPokemon = async () => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

      try {
        const res = await fetch(URL);
        const data = await res.json();
        setPokemon(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
    setPokemon(null);
  };

  return (
    <div className="search-container">
      <AsyncBox value={pokemon} />
      <Button type="submit" onClick={handleClick}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
