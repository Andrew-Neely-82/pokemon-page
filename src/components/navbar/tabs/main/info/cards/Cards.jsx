import { Card, CardHeader, CardMedia, CardContent, Zoom, Tooltip, Skeleton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Typography } from "@mui/material";
import CardActionsComp from "./CardActionsComp";
import Avatar from "@mui/material/Avatar";
import { getTypeIcon } from "../../../index";
import * as React from "react";

export default function Cards({ pokemon, description, loadingState }) {
  const [pokemonData, setPokemonData] = React.useState(null);
  const [loading, setLoading] = React.useState(loadingState);

  const avatarProps = {
    sx: {
      display: "flex",
      gap: "1rem !important",
      overflow: "visible",
      marginRight: "0 !important",
    },
  };

  const fetchPokemonData = async (poke) => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(poke.url);
      const data = await res.json();
      setPokemonData(data);
      setLoading(false); // Data fetched, loading done
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is false even if there's an error
    }
  };

  React.useEffect(() => {
    if (!loadingState) {
      // If the parent isn't loading, fetch the card data
      const fetchPokemonData = async () => {
        setLoading(true); // Start loading
        try {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          setPokemonData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Data fetched or failed, loading done
        }
      };
      fetchPokemonData();
    }
  }, [pokemon, loadingState]);

  const LEGENDARIES = {
    144: true, // Articuno
    145: true, // Zapdos
    146: true, // Moltres
    // Add more legendary Pokémon IDs as needed
  };

  const MYTHICALS = {
    151: true, // Mew
    // Add more mythical Pokémon IDs as needed
  };
  const className = pokemonData ? (LEGENDARIES[pokemonData.id] ? "legendary" : MYTHICALS[pokemonData.id] ? "legendary mythical" : "") : "";

  return (
    <>
      <Card
        className={`${className} card`}
        sx={
          {
            // maxWidth: 345,
          }
        }>
        {pokemon && pokemonData && (
          <React.Fragment>
            <CardHeader
              action={
                <IconButton aria-label="settings" className="br-100">
                  <MoreVertIcon />
                </IconButton>
              }
              avatar={pokemonData?.types.map((types) => (
                <Tooltip arrow placement="top" TransitionComponent={Zoom} title={`${types?.type.name.charAt(0).toUpperCase() + types.type.name.slice(1)}`}>
                  <Avatar style={{ cursor: "pointer" }} className={`${types.type.name} capitalize`} {...avatarProps} title={`${types.type.name}`}>
                    {getTypeIcon(types.type.name)}
                  </Avatar>
                </Tooltip>
              ))}
              title={pokemonData?.name}
              subheader={`# ${pokemonData?.id}`}
              className="card-header capitalize"
            />
            <CardMedia className={`${pokemon.name === "pikachu" ? "pikachu-bg" : ""} ${pokemonData.types.map((types) => types.type.name).join("-")}-bg`} component="img" height="200px" image={pokemonData.sprites.other["official-artwork"].front_default} alt={`${pokemonData.name}'s picture`} loading="lazy" />
            <div className="content">
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              {/* ACTIONS */}
              <CardActionsComp pokemonData={pokemonData} />
            </div>
          </React.Fragment>
        )}
      </Card>
    </>
  );
}
