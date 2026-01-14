import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function CreatePlaylistButton({ onClick }) {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{ textTransform: "none" }}
    >
      New Playlist
    </Button>
  );
}
