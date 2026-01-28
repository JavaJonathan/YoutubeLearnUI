import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import TopBar from "./topBar";
import SideNav from "./sideNav";
import MainContent from "./mainContent";
import CreateTagModal from "./createTagModal";
import CreatePlaylistModal from "./createPlaylistModal";
import AddVideoModal from "./addVideoModal";

import { GET_PLAYLISTS, CREATE_PLAYLIST } from "../redux/actionTypes";
import { GET_TAGS, CREATE_TAG } from "../redux/actionTypes";
import { GET_VIDEOS, ADD_VIDEO } from "../redux/actionTypes";

import {
  selectPlaylistItems,
  selectTagItems,
  selectPlaylistsLoading,
  selectTagsLoading,
  selectVideosLoading,
} from "../redux/selectors";

const drawerWidth = 280;

export default function Home() {
  const dispatch = useDispatch();

  const playlists = useSelector(selectPlaylistItems);
  const tags = useSelector(selectTagItems);

  const playlistsIsLoading = useSelector(selectPlaylistsLoading);
  const tagsIsLoading = useSelector(selectTagsLoading);
  const videosIsLoading = useSelector(selectVideosLoading);

  const isLoading = playlistsIsLoading || tagsIsLoading || videosIsLoading;

  const [active, setActive] = useState("playlist_view"); // "playlist_view" | "tag_view"
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [selectedTagId, setSelectedTagId] = useState(null);

  const selectedPlaylist = useMemo(
    () => playlists.find((playlistEntity) => playlistEntity.id === selectedPlaylistId) ?? null,
    [playlists, selectedPlaylistId]
  );

  const selectedTag = useMemo(
    () => tags.find((tagEntity) => tagEntity.id === selectedTagId) ?? null,
    [tags, selectedTagId]
  );

  useEffect(() => {
    dispatch({ type: GET_PLAYLISTS });
    dispatch({ type: GET_TAGS });
  }, [dispatch]);

  useEffect(() => {
    if (selectedPlaylistId) return;
    if (!playlists || playlists.length === 0) return;

    setSelectedPlaylistId(playlists[0].id);
  }, [playlists, selectedPlaylistId]);

  useEffect(() => {
    if (!selectedPlaylistId) return;

    
  }, [dispatch, selectedPlaylistId, selectedTagId]);

  const pageTitle =
    active === "tag_view"
      ? selectedTag?.title
      : selectedPlaylist?.title;

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    dispatch({
      type: GET_VIDEOS,
      payload: {
        playlistId: playlistId,
        tags: [],
        matchAllTags: false,
        videoView: 'learn',
        page: 1,
        pageSize: 200,
      },
    });
    setActive("playlist_view");
  };

  const handleSelectTag = (tagId) => {
    setSelectedTagId(tagId);
    dispatch({
      type: GET_VIDEOS,
      payload: {
        playlistId: null,
        tags: [tagId],
        matchAllTags: false,
        page: 1,
        pageSize: 200,
      },
    });
    setActive("tag_view");
  };

  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleAddVideoOpen = () => setVideoModalOpen(true);
  const handleAddVideoClose = () => setVideoModalOpen(false);

  const handleCreatePlaylistOpen = () => setPlaylistModalOpen(true);
  const handleCreatePlaylistClose = () => setPlaylistModalOpen(false);

  const handleCreateTagOpen = () => setTagModalOpen(true);
  const handleCreateTagClose = () => setTagModalOpen(false);

  const handleCreatePlaylist = (title) => {
    dispatch({ type: CREATE_PLAYLIST, payload: { title } });
    handleCreatePlaylistClose();
  };

  const handleCreateTag = (name) => {
    dispatch({ type: CREATE_TAG, payload: { name } });
    handleCreateTagClose();
  };

  const handleAddVideo = ({ title, link, channel }) => {
    if (!selectedPlaylistId) return;

    dispatch({
      type: ADD_VIDEO,
      payload: {
        playlistId: selectedPlaylistId,
        title,
        link,
        channel,
      },
    });

    handleAddVideoClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress />
      </Backdrop>

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
