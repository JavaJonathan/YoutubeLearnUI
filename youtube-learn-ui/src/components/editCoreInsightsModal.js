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
  maxHeight: "85vh",
  display: "flex",             
  flexDirection: "column",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
  overflow: "hidden"
};

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

    const coreInsights = text.trim();
    if (!coreInsights) return;

    dispatch({
      type: UPDATE_VIDEO_CORE_INSIGHT,
      payload: { videoId, coreInsights },
    });

    onClose();
  };

  const title = video?.title ? `Core Insights — ${video.title}` : "Core Insights";
  const canSave = Boolean((video?.id) && text.trim()) && !isLoading;

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700} noWrap>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          What’s the distilled takeaway?
        </Typography>

        <Box sx={{ mt: 2, flex: 1, minHeight: 0, overflow: "auto", pt: 1 }}>
          <TextField
            label="Core Insights"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="e.g. Systems get the outcomes they incentivize."
            multiline
            minRows={6}
            maxRows={18}
            fullWidth
            autoFocus
            error={Boolean(error)}
            helperText={error ? String(error) : " "}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
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
      </Box>
    </Modal>
  );
}
