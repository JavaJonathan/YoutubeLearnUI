import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import * as videoService from "../services/videoService";
import {
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_WITH_VIDEOS
} from "../redux/actionTypes";
import { selectPlaylistsLoading, selectPlaylistsError } from "../redux/selectors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

function clean(text) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function isProbablyYoutubePlaylistUrl(url) {
  if (!url) return false;
  const lowerCasedUrl = url.toLowerCase();
  return (
    lowerCasedUrl.includes("youtube.com") &&
    (lowerCasedUrl.includes("list=") || lowerCasedUrl.includes("/playlist"))
  );
}

export default function CreatePlaylistModal({ open, onClose }) {
  const dispatch = useDispatch();

  const isSaving = useSelector(selectPlaylistsLoading);
  const saveError = useSelector(selectPlaylistsError);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");

  useEffect(() => {
    if (!open) return;

    setName("");
    setUrl("");
    setIsScraping(false);
    setScrapeError("");
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const handleCreate = async () => {
    setScrapeError("");

    const cleanedName = clean(name);
    const cleanedUrl = clean(url);

    if (!cleanedName) return;

    const shouldScrape = Boolean(cleanedUrl);

    if (!shouldScrape) {
      dispatch({
        type: CREATE_PLAYLIST,
        payload: {
          title: cleanedName,
        },
      });

      handleClose();
      return;
    }

    if (!isProbablyYoutubePlaylistUrl(cleanedUrl)) {
      setScrapeError("That doesn't look like a YouTube playlist URL.");
      return;
    }

    try {
      setIsScraping(true);

      const scrapedVideos = await videoService.scrapePlaylist({ url: cleanedUrl });

      setIsScraping(false);

      dispatch({
        type: CREATE_PLAYLIST_WITH_VIDEOS,
        payload: {
          title: cleanedName,
          videos: scrapedVideos,
        },
      });

      handleClose();
    } catch (error) {
      setIsScraping(false);
      setScrapeError(String(error?.message ?? error));
    }
  };

  const helperText = clean(url)
    ? "Paste a YouTube playlist link and click Save to scrape + import the videos."
    : "Enter a name. Optionally paste a YouTube playlist link to scrape + import.";

  const cleanedUrl = clean(url);
  const urlLooksValid = !cleanedUrl || isProbablyYoutubePlaylistUrl(cleanedUrl);

  const urlErrorText =
    scrapeError || (!urlLooksValid ? "That doesn't look like a YouTube playlist URL." : "");

  const disableSave =
    !clean(name) || isSaving || isScraping || (Boolean(cleanedUrl) && !urlLooksValid);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          New Playlist
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {helperText}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Playlist name"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            size="small"
          />

          <Divider />

          <TextField
            label="YouTube playlist URL (optional)"
            fullWidth
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            size="small"
            placeholder="https://www.youtube.com/playlist?list=..."
            error={Boolean(urlErrorText)}
            helperText={urlErrorText || " "}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Box sx={{ flexGrow: 1 }} />

            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={disableSave}
              sx={{ textTransform: "none" }}
            >
              {isSaving || isScraping ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <span>Saving…</span>
                </Stack>
              ) : (
                "Save"
              )}
            </Button>
          </Stack>

          {saveError ? (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {String(saveError)}
            </Typography>
          ) : null}
        </Stack>
      </Box>
    </Modal>
  );
}
