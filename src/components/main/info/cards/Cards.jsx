import { Card, CardHeader, CardMedia, CardContent, Zoom, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Typography } from "@mui/material";
import CardActionsComp from "./CardActionsComp";
import Avatar from "@mui/material/Avatar";
import { getTypeIcon } from "..";
import * as React from "react";

export default function Cards({ pokemon, description }) {
  const [pokemonData, setPokemonData] = React.useState(null);

  const avatarProps = {
    sx: {
      display: "flex",
      gap: "1rem !important",
      overflow: "visible",
      marginRight: "0 !important",
    },
  };

  const fetchPokemonData = async (poke) => {
    const URL = await `${poke.url}`;
    // console.log(URL);
    try {
      const res = await fetch(URL);
      const data = await res.json();
      // console.log(data);
      setPokemonData(data);
    } catch (error) {
      console.error(error);
    }
    // setPokemonData(data);
  };

  React.useEffect(() => {
    fetchPokemonData(pokemon);
  }, [pokemon]);

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
