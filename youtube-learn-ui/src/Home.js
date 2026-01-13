import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SellIcon from "@mui/icons-material/Sell";
import YouTubeIcon from "@mui/icons-material/YouTube";

import PlaylistTable from "./playlistTable";
import CreateTagModal from "./createTagModal";
import CreatePlaylistModal from "./createPlaylistModal";
import AddVideoModal from "./addVideoModal";

const drawerWidth = 280;

// Demo data (replace with your real playlists from API/state)
const DEMO_PLAYLISTS = [
  { id: "pl-1", name: "Economics" },
  { id: "pl-2", name: "Software Engineering" },
  { id: "pl-3", name: "Chess" },
];

// Demo tags (replace with your real tags from API/state)
const DEMO_TAGS = [
  { id: "tag-1", name: "Incentives" },
  { id: "tag-2", name: "Tradeoffs" },
  { id: "tag-3", name: "Second-order effects" },
  { id: "tag-4", name: "Time horizons" },
  { id: "tag-5", name: "Constraints" },
  { id: "tag-6", name: "Asymmetry" },
  { id: "tag-7", name: "Environment > Willpower" },
];

export default function Home() {
  const [active, setActive] = useState("playlist_view");

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(
    DEMO_PLAYLISTS[0]?.id ?? null
  );
  const [selectedTagId, setSelectedTagId] = useState(null);

  const [playlists, setPlaylists] = useState(DEMO_PLAYLISTS);
  const [tags, setTags] = useState(DEMO_TAGS);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleCreatePlaylist = () => {
    console.log("Create playlist");
    // later: open dialog
  };

  const handleCreatePlaylistOpen = () => setPlaylistModalOpen(true);
  const handleCreatePlaylistClose = () => setPlaylistModalOpen(false);

  const handleCreateTag = () => {
    console.log("Create tag");
    // later: open dialog
  };

  const handleCreateTagOpen = () => setTagModalOpen(true);
  const handleCreateTagClose = () => setTagModalOpen(false);

  const handleAddVideo = () => {
    console.log("Add video");
    // later: open dialog
  };

  const handleAddVideoOpen = () => setVideoModalOpen(true);
  const handleAddVideoClose = () => setVideoModalOpen(false);

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setSelectedTagId(null);
    setActive("playlist_view");
  };

  const handleSelectTag = (tagId) => {
    setSelectedTagId(tagId);
    setActive("tag_view");
  };

  const selectedPlaylist = useMemo(() => {
    return playlists.find((p) => p.id === selectedPlaylistId) || null;
  }, [playlists, selectedPlaylistId]);

  const selectedTag = useMemo(() => {
    return tags.find((t) => t.id === selectedTagId) || null;
  }, [tags, selectedTagId]);

  const renderMain = () => {
    if (active === "tag_view" && selectedTag) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">{selectedTag.name}</Typography>
          <Typography color="text.secondary">
            Show videos filtered by tag: <b>{selectedTag.name}</b>
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PlaylistTable playlistId={selectedPlaylist?.id} />
      </Box>
    );
  };

  const isPlaylistSelected = (playlistId) =>
    active === "playlist_view" && selectedPlaylistId === playlistId;

  const isTagSelected = (tagId) => active === "tag_view" && selectedTagId === tagId;

  const pageTitle =
    active === "tag_view" ? selectedTag?.name ?? "Tag" : selectedPlaylist?.name ?? "Playlist";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundImage: "none",
        }}
      >
        {/* Center title now that the right-side action is gone */}
        <Toolbar sx={{ position: "relative", justifyContent: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <YouTubeIcon />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              YouTube Learn
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Save → Distill → Resurface
            </Typography>
          </Box>
        </Toolbar>

        <Divider />

        {/* Buttons group: Add Video moved here */}
        <Box sx={{ p: 2 }}>
          <Stack spacing={1}>
  {/* Primary action */}
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={handleAddVideoOpen}
    sx={{ textTransform: "none" }}
    fullWidth
  >
    Add Video
  </Button>

  {/* Secondary actions */}
  <Button
    variant="outlined"
    startIcon={<PlaylistPlayIcon />}
    onClick={handleCreatePlaylistOpen}
    sx={{ textTransform: "none" }}
    fullWidth
  >
    New Playlist
  </Button>

  <Button
    variant="text"
    startIcon={<SellIcon />}
    onClick={handleCreateTagOpen}
    sx={{ textTransform: "none" }}
    fullWidth
  >
    New Tag
  </Button>
</Stack>
        </Box>

        <Divider />

        <Box
          sx={{
            px: 1,
            py: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flex: 1,
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              flex: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ px: 1.5, color: "text.secondary", letterSpacing: 1 }}
            >
              Your Playlists
            </Typography>

            <Box sx={{ overflowY: "auto", minHeight: 0, flex: 1, pr: 0.5 }}>
              <List sx={{ py: 0 }}>
                {playlists.map((p) => (
                  <ListItem key={p.id} disablePadding>
                    <ListItemButton
                      selected={isPlaylistSelected(p.id)}
                      onClick={() => handleSelectPlaylist(p.id)}
                    >
                      <ListItemIcon>
                        <PlaylistPlayIcon />
                      </ListItemIcon>
                      <ListItemText primary={p.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              flex: 1,
            }}
          >
            <Typography
              variant="overline"
              sx={{ px: 1.5, color: "text.secondary", letterSpacing: 1 }}
            >
              Your Tags
            </Typography>

            <Box sx={{ overflowY: "auto", minHeight: 0, flex: 1, pr: 0.5 }}>
              <List sx={{ py: 0 }}>
                {tags.map((t) => (
                  <ListItem key={t.id} disablePadding>
                    <ListItemButton
                      selected={isTagSelected(t.id)}
                      onClick={() => handleSelectTag(t.id)}
                    >
                      <ListItemIcon>
                        <SellIcon />
                      </ListItemIcon>
                      <ListItemText primary={t.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        {renderMain()}
      </Box>

      <CreateTagModal
        open={tagModalOpen}
        onClose={handleCreateTagClose}
        onCreate={handleCreateTag}
      />
      <CreatePlaylistModal
        open={playlistModalOpen}
        onClose={handleCreatePlaylistClose}
        onCreate={handleCreatePlaylist}
      />
      <AddVideoModal
        open={videoModalOpen}
        onClose={handleAddVideoClose}
        onAdd={handleAddVideo}
        playlist={selectedPlaylist}
      />
    </Box>
  );
}
