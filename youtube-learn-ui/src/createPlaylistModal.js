import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { scrapePlaylist } from "./httpHelper";

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

function isProbablyYoutubePlaylistUrl(url) {
  if (!url) return false;
  return (
    url.includes("youtube.com") &&
    (url.includes("list=") || url.includes("/playlist"))
  );
}

export default function CreatePlaylistModal({ open, onClose, onCreate }) {
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
    onClose();
  };

  const handleScrape = async () => {
    setScrapeError("");

    if (!isProbablyYoutubePlaylistUrl(url)) {
      setScrapeError("That doesn't look like a YouTube playlist URL.");
      return;
    }

    try {
      setIsScraping(true);

      await scrapePlaylist(url);
    } catch (e) {
      setScrapeError(e?.message || "Failed to scrape playlist.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleCreate = () => {
    // "either or" logic:
    // - If URL is present, treat as scrape mode
    // - Otherwise manual
    const mode = url ? "scrape" : "manual";

    // minimal guard so you don't create blank playlists by accident
    if (!name.trim()) return;

    onCreate({
      mode,
      name: name.trim(),
      url: url.trim() || null,
      // items: optionally pass back scraped items if you store them in state
    });

    handleClose();
  };

  const helperText = url
    ? "Paste a YouTube playlist link and click Scrape (or just Save if name is filled)."
    : "Either enter a name, or paste a YouTube playlist link to scrape it.";

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
            onChange={(e) => setName(e.target.value)}
            size="small"
          />

          <Divider />

          <TextField
            label="YouTube playlist URL (optional)"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="small"
            placeholder="https://www.youtube.com/playlist?list=..."
            error={Boolean(scrapeError)}
            helperText={scrapeError || " "}
          />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={handleScrape}
              disabled={!url || isScraping}
              sx={{ textTransform: "none" }}
            >
              {isScraping ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <span>Scraping…</span>
                </Stack>
              ) : (
                "Scrape"
              )}
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={!name.trim()}
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
