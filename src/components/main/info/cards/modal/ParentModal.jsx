import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Fade } from "@mui/material";

const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, pt: 2, px: 4, pb: 3 };
const buttonStyling = { position: "absolute", top: 0, right: "0", background: "transparent", border: "none", padding: 0, cursor: "pointer" };

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button sx={{ fontWeight: "600" }} variant="outlined" onClick={handleOpen}>
        Open Child Modal
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Child Title</h2>
          <p id="child-modal-description">Child text</p>
          <button onClick={handleClose} style={buttonStyling}>
            <CloseIcon sx={{ background: "red", padding: 0.5 }} />
          </button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ParentModal({ pokemonData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <h2 className="parent-modal-title capitalize">{pokemonData.name}</h2>
          <p className="parent-modal-description">Parent text</p>
          <ChildModal />
          <button onClick={handleClose} style={buttonStyling}>
            <CloseIcon sx={{ background: "red", padding: 0.5 }} />
          </button>
        </Box>
      </Modal>
    </div>
  );
}
