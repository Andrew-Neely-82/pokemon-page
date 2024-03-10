import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ChildModal = ({ pokemonData }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, pt: 2, px: 4, pb: 3 };
  const buttonStyling = { position: "absolute", top: 0, right: "0", background: "transparent", border: "none", padding: 0, cursor: "pointer" };

  return (
    <React.Fragment>
      <Button sx={{ fontWeight: "600" }} variant="outlined" onClick={handleOpen}>
        Open Child Modal
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">
            About <span className="capitalize">{pokemonData.name}</span>
          </h2>
          <p id="child-modal-description">Child text</p>
          <button onClick={handleClose} style={buttonStyling}>
            <CloseIcon className="close-icon" />
          </button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
