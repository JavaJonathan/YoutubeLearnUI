import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import { CREATE_TAG } from "../redux/actionTypes";
import { selectTagsLoading, selectTagsError } from "../redux/selectors";

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

function clean(text) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

export default function CreateTagModal({ open, onClose }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectTagsLoading);
  const error = useSelector(selectTagsError);

  const [name, setName] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
  }, [open]);

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleCreate = () => {
    const cleanedName = clean(name);
    if (!cleanedName) return;

    dispatch({
      type: CREATE_TAG,
      payload: { name: cleanedName },
    });

    handleClose();
  };

  const canSave = Boolean(clean(name)) && !isLoading;

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
          onChange={(event) => setName(event.target.value)}
          size="small"
          error={Boolean(error)}
          helperText={error ? String(error) : " "}
        />

        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ textTransform: "none" }}
            disabled={!canSave}
          >
            {isLoading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={16} />
                <span>Saving…</span>
              </Stack>
            ) : (
              "Save"
            )}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
