import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default function CreateTagModal({ open, onClose, onCreate }) {
  const [name, setName] = React.useState("");

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleCreate = () => {
    if (!name) return;
    onCreate(name);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          New Tag
        </Typography>

        <TextField
          label="Tag name"
          fullWidth
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />

        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ textTransform: "none" }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
