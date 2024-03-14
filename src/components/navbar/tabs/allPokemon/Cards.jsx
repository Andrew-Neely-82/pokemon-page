import { Card, CardHeader, CardMedia, CardContent, Zoom, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Typography } from "@mui/material";
import { LEGENDARIES, MYTHICALS } from "../main/info/cards/cardsIndex";
import "react-loading-skeleton/dist/skeleton.css";
import CardActionsComp from "../main/info/cards/CardActionsComp";
import Skeleton from "react-loading-skeleton";
import { getTypeIcon } from "../index";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

export default function Cards({ pokemon, description, loadingState }) {
  const [pokemonData, setPokemonData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const avatarProps = {
    sx: {
      display: "flex",
      gap: "1rem !important",
      overflow: "visible",
      marginRight: "0 !important",
    },
  };

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
      } finally {
        setLoading(false); // Data fetched or failed, loading done
      }
    };

    fetchPokemonData();
  }, [pokemon.url]); // Depend directly on pokemon.url

  const className = (pokemonData) => (pokemonData ? (LEGENDARIES[pokemonData.id] ? "legendary" : MYTHICALS[pokemonData.id] ? "legendary mythical" : "") : "");

  return (
    <>
      <Card className={`${className(pokemonData)} card `}>
        {loading ? (
          <>
            <CardHeader avatar={<Skeleton circle={true} height={40} width={40} style={{ marginRight: "1rem" }} />} action={<Skeleton circle={true} height={40} width={40} />} title={<Skeleton width="80%" />} subheader={<Skeleton width="40%" />} />
            <Skeleton height={200} />
            <CardContent>
              <Skeleton count={3} />
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader
              action={
                <IconButton aria-label="settings" style={{ display: "flex", height: "100% !important", marginRight: "1rem" }}>
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
              title={pokemonData.name}
              subheader={`#${pokemonData.id}`}
              className="card-header capitalize"
            />
            <CardMedia className={`${pokemon.name === "pikachu" ? "pikachu-bg" : ""} ${pokemonData.types.map((types) => types.type.name).join("-")}-bg`} component="img" height="200px" image={pokemonData.sprites.other["official-artwork"].front_default} alt={`${pokemonData.name}'s picture`} loading="lazy" />
            <div className="content">
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActionsComp pokemonData={pokemonData} />
            </div>
          </>
        )}
      </Card>
    </>
  );
}
