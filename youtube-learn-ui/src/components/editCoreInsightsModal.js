import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import { UPDATE_VIDEO_CORE_INSIGHT } from "../redux/actionTypes";
import { selectVideosLoading, selectVideosError } from "../redux/selectors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
};

function clean(text) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

export default function EditCoreInsightModal({ open, onClose, video }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectVideosLoading);
  const error = useSelector(selectVideosError);

  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) return;
    setText(video?.coreInsights);
  }, [open, video?.coreInsights]);

  const handleSave = () => {
    const videoId = video?.id ?? video?.Id;
    if (!videoId) return;

    const coreInsights = clean(text);
    if (!coreInsights) return;

    dispatch({
      type: UPDATE_VIDEO_CORE_INSIGHT,
      payload: { videoId, coreInsights },
    });

    onClose();
  };

  const title = video?.title ? `Core Insights — ${video.title}` : "Core Insights";
  const canSave = Boolean((video?.id ?? video?.Id) && clean(text)) && !isLoading;

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          What’s the distilled takeaway?
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Core Insights"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="e.g. Systems get the outcomes they incentivize."
            multiline
            minRows={3}
            fullWidth
            autoFocus
            error={Boolean(error)}
            helperText={error ? String(error) : " "}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={onClose} disabled={isLoading} sx={{ textTransform: "none" }}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!canSave}
              sx={{ textTransform: "none" }}
            >
              {isLoading ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <span>Saving…</span>
                </Stack>
              ) : (
                "Save"
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
