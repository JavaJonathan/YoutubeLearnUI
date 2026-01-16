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
import { SCRAPE_VIDEO, ADD_VIDEO } from "../redux/actionTypes";
import {
  selectIsScrapingVideo,
  selectScrapedVideo,
  selectScrapeVideoError,
} from "../redux/selectors";

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

function clean(text) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function isProbablyYoutubeVideoUrl(url) {
  if (!url) return false;
  const lowerCasedUrl = url.toLowerCase();
  return lowerCasedUrl.includes("youtube.com/watch") || lowerCasedUrl.includes("youtu.be/");
}

export default function AddVideoModal({ open, onClose, playlist }) {
  const dispatch = useDispatch();

  const isScraping = useSelector(selectIsScrapingVideo);
  const scrapedVideo = useSelector(selectScrapedVideo);
  const scrapeError = useSelector(selectScrapeVideoError);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [channel, setChannel] = useState("");

  useEffect(() => {
    if (!open) return;

    setTitle("");
    setLink("");
    setChannel("");
  }, [open, playlist?.id]);

  useEffect(() => {
    if (!open) return;
    if (!scrapedVideo) return;

    if (scrapedVideo?.title) setTitle(clean(scrapedVideo.title));
    if (scrapedVideo?.channel) setChannel(clean(scrapedVideo.channel));
    if (scrapedVideo?.url) setLink(clean(scrapedVideo.url));
    if (scrapedVideo?.link) setLink(clean(scrapedVideo.link));
  }, [open, scrapedVideo]);

  const handleClose = () => {
    onClose?.();
  };

  const handleScrape = () => {
    const url = clean(link);

    dispatch({
      type: SCRAPE_VIDEO,
      payload: { url },
    });
  };

  const handleAdd = () => {
    dispatch({
      type: ADD_VIDEO,
      payload: {
        playlistId: playlist?.id,
        title: clean(title),
        link: clean(link),
        channel: clean(channel),
      },
    });

    handleClose();
  };

  const canSave = Boolean(playlist?.id) && clean(title) && clean(link) && clean(channel);

  const youtubeLinkError =
    Boolean(scrapeError) || (clean(link) && !isProbablyYoutubeVideoUrl(clean(link)));

  const youtubeLinkHelperText = scrapeError
    ? scrapeError
    : clean(link) && !isProbablyYoutubeVideoUrl(clean(link))
    ? "That doesn't look like a YouTube video link."
    : " ";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Add Video
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Adding to: <b>{playlist?.title ?? playlist?.name ?? "Unknown playlist"}</b>
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="YouTube Link"
            fullWidth
            size="small"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            error={youtubeLinkError}
            helperText={youtubeLinkHelperText}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Button
              variant="outlined"
              onClick={handleScrape}
              disabled={!clean(link) || isScraping || !isProbablyYoutubeVideoUrl(clean(link))}
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
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />

          <TextField
            label="Channel"
            fullWidth
            size="small"
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
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
