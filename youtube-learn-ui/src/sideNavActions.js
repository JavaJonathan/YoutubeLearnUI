import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SellIcon from "@mui/icons-material/Sell";

export default function SideNavActions({ onAddVideo, onNewPlaylist, onNewTag }) {
  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddVideo}
          sx={{ textTransform: "none" }}
          fullWidth
        >
          Add Video
        </Button>

        <Button
          variant="outlined"
          startIcon={<PlaylistPlayIcon />}
          onClick={onNewPlaylist}
          sx={{ textTransform: "none" }}
          fullWidth
        >
          New Playlist
        </Button>

        <Button
          variant="text"
          startIcon={<SellIcon />}
          onClick={onNewTag}
          sx={{ textTransform: "none" }}
          fullWidth
        >
          New Tag
        </Button>
      </Stack>
    </Box>
  );
}
