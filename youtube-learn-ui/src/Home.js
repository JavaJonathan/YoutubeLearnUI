import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import TopBar from "./topBar";
import SideNav from "./sideNav";
import MainContent from "./mainContent";

import CreateTagModal from "./createTagModal";
import CreatePlaylistModal from "./createPlaylistModal";
import AddVideoModal from "./addVideoModal";

const drawerWidth = 280;

const DEMO_PLAYLISTS = [
  { id: "pl-1", name: "Economics" },
  { id: "pl-2", name: "Software Engineering" },
  { id: "pl-3", name: "Chess" },
];

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
  const [active, setActive] = useState("playlist_view"); // "playlist_view" | "tag_view"

  const [playlists, setPlaylists] = useState(DEMO_PLAYLISTS);
  const [tags, setTags] = useState(DEMO_TAGS);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(DEMO_PLAYLISTS[0]?.id ?? null);
  const [selectedTagId, setSelectedTagId] = useState(null);

  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const selectedPlaylist = useMemo(
    () => playlists.find((p) => p.id === selectedPlaylistId) || null,
    [playlists, selectedPlaylistId]
  );

  const selectedTag = useMemo(
    () => tags.find((t) => t.id === selectedTagId) || null,
    [tags, selectedTagId]
  );

  const pageTitle =
    active === "tag_view" ? selectedTag?.name ?? "Tag" : selectedPlaylist?.name ?? "Playlist";

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setSelectedTagId(null);
    setActive("playlist_view");
  };

  const handleSelectTag = (tagId) => {
    setSelectedTagId(tagId);
    setActive("tag_view");
  };

  const handleAddVideoOpen = () => setVideoModalOpen(true);
  const handleAddVideoClose = () => setVideoModalOpen(false);

  const handleCreatePlaylistOpen = () => setPlaylistModalOpen(true);
  const handleCreatePlaylistClose = () => setPlaylistModalOpen(false);

  const handleCreateTagOpen = () => setTagModalOpen(true);
  const handleCreateTagClose = () => setTagModalOpen(false);

  const handleCreatePlaylist = () => console.log("Create playlist");
  const handleCreateTag = () => console.log("Create tag");
  const handleAddVideo = () => console.log("Add video");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopBar drawerWidth={drawerWidth} title={pageTitle} />

      <SideNav
        drawerWidth={drawerWidth}
        playlists={playlists}
        tags={tags}
        active={active}
        selectedPlaylistId={selectedPlaylistId}
        selectedTagId={selectedTagId}
        onSelectPlaylist={handleSelectPlaylist}
        onSelectTag={handleSelectTag}
        onAddVideo={handleAddVideoOpen}
        onNewPlaylist={handleCreatePlaylistOpen}
        onNewTag={handleCreateTagOpen}
      />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        <MainContent active={active} selectedPlaylist={selectedPlaylist} selectedTag={selectedTag} />
      </Box>

      <CreateTagModal open={tagModalOpen} onClose={handleCreateTagClose} onCreate={handleCreateTag} />
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
