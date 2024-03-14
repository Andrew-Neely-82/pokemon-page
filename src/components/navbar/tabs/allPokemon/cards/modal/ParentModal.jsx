import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ChildModal from "./ChildModal";

const buttonStyling = { position: "absolute", top: 0, right: "0", background: "transparent", border: "none", padding: 0, cursor: "pointer" };

export default function ParentModal({ pokemonData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>More Info</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box className="box">
          <h2 className="parent-modal-title capitalize">{pokemonData.name}</h2>
          <p className="parent-modal-description">Parent component text</p>
          <ChildModal pokemonData={pokemonData} />
          <button className="modal-btn" onClick={handleClose} style={buttonStyling}>
            <CloseIcon className="close-icon" />
          </button>
        </Box>
      </Modal>
    </>
  );
}
