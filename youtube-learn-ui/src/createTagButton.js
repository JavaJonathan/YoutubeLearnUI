import * as React from "react";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";

export default function CreateTagButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      startIcon={<LabelIcon />}
      onClick={onClick}
      sx={{ textTransform: "none" }}
    >
      New Tag
    </Button>
  );
}
