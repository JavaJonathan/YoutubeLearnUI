import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaylistTable from "./playlistTable";

export default function MainContent({ active, selectedPlaylist, selectedTag }) {
  if (active === "tag_view" && selectedTag) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">{selectedTag.name}</Typography>
        <Typography color="text.secondary">
          Show videos filtered by tag: <b>{selectedTag.name}</b>
        </Typography>
        {/* Later: <VideoTable filter={{ tagId: selectedTag.id }} /> */}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PlaylistTable playlistId={selectedPlaylist?.id} />
    </Box>
  );
}
