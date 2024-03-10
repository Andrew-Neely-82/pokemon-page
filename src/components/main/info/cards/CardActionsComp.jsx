import { CardActions, Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ParentModal from "./modal/ParentModal";

const CardActionsComp = ({ pokemonData }) => {
  return (
    <CardActions sx={styling.cardActions} disableSpacing>
      <ParentModal pokemonData={pokemonData}>More Data</ParentModal>
      <Button sx={styling.btn}>
        <ReplyIcon />
      </Button>
    </CardActions>
  );
};

export default CardActionsComp;

const styling = {
  cardActions: { padding: "1rem", justifyContent: "space-between" },
  btn: { borderRadius: "50%", width: "fit-content", minWidth: "fit-content" },
  icon: { transform: "rotateY(180deg)" },
};
