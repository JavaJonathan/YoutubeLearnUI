import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function clean(s) {
  return (s ?? "").replace(/\s+/g, " ").trim();
}

function isProbablyYoutubeVideoUrl(url) {
  if (!url) return false;
  const u = url.toLowerCase();
  return u.includes("youtube.com/watch") || u.includes("youtu.be/");
}

export default function AddVideoModal({ open, onClose, onAdd, playlist }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [channel, setChannel] = useState("");

  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setLink("");
    setChannel("");
    setIsScraping(false);
    setScrapeError("");
  }, [open, playlist?.id]);

  const handleClose = () => {
    onClose?.();
  };

  const handleScrape = async () => {
    setScrapeError("");

    const url = clean(link);
    if (!isProbablyYoutubeVideoUrl(url)) {
      setScrapeError("That doesn't look like a YouTube video link.");
      return;
    }

    try {
      setIsScraping(true);

      const res = await fetch("http://localhost:3001/api/scrapeVideo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to scrape video");
  }

  const data = await res.json();

      // Fill fields (only overwrite if we got values)
      if (data?.title) setTitle(clean(data.title));
      if (data?.channel) setChannel(clean(data.channel));
      if (data?.url) setLink(clean(data.url));
    } catch (err) {
      setScrapeError(err?.message || "Failed to scrape video.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleAdd = () => {
    onAdd?.({
      playlistId: playlist?.id,
      title: clean(title),
      link: clean(link),
      channel: clean(channel),
    });
    handleClose();
  };

  const canSave = Boolean(playlist?.id) && clean(title) && clean(link) && clean(channel);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Add Video
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Adding to: <b>{playlist?.name ?? "Unknown playlist"}</b>
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="YouTube Link"
            fullWidth
            size="small"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            error={Boolean(scrapeError)}
            helperText={scrapeError || " "}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Button
              variant="outlined"
              onClick={handleScrape}
              disabled={!clean(link) || isScraping}
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
          </Stack>

          <Divider />

          <TextField
            label="Title"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <TextField
            label="Channel"
            fullWidth
            size="small"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="e.g. Veritasium"
          />

          <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{ textTransform: "none" }}
              disabled={!canSave}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
