import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const ChildModal = ({ pokemonData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyling = { position: "absolute", top: 0, right: "0", background: "transparent", border: "none", padding: 0, cursor: "pointer" };

  return (
    <>
      <Button sx={{ fontWeight: "600" }} variant="outlined" onClick={handleOpen}>
        Open Child Modal
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
        <Box className="box">
          <h2 id="child-modal-title">
            About <span className="capitalize">{pokemonData.name}</span>
          </h2>
          <p id="child-modal-description">Child component text</p>
          <button className="modal-btn" onClick={handleClose} style={buttonStyling}>
            <CloseIcon className="close-icon" />
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default ChildModal;
