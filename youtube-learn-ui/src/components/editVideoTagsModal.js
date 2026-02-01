import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

import { UPDATE_VIDEO_TAGS } from "../redux/actionTypes";
import { selectTagItems, selectVideosLoading, selectVideosError } from "../redux/selectors";

//TO DO: Add Core Insights to playlists
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

function getEntityId(entity) {
  return entity?.id ?? entity?.Id;
}

function getTagTitle(tagEntity) {
  return tagEntity?.title ?? tagEntity?.Title ?? "";
}

function dedupeCaseInsensitive(arr) {
  const seen = new Set();
  const out = [];

  for (const item of arr) {
    const value = clean(item);
    if (!value) continue;

    const key = value.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    out.push(value);
  }

  return out;
}

export default function EditVideoTagsModal({ open, onClose, video }) {
  const dispatch = useDispatch();
  const allTagEntities = useSelector(selectTagItems);
  const isLoading = useSelector(selectVideosLoading);
  const error = useSelector(selectVideosError);

  const tagOptions = useMemo(() => {
    const tagTitles = (allTagEntities ?? [])
      .map((tagEntity) => getTagTitle(tagEntity))
      .filter(Boolean);

    return dedupeCaseInsensitive(tagTitles).sort((a, b) => a.localeCompare(b));
  }, [allTagEntities]);

  const initialSelected = useMemo(() => {
    const existingTagEntities = video?.tags ?? video?.Tags ?? [];
    const existingTagTitles = existingTagEntities
      .map((tagEntity) => getTagTitle(tagEntity))
      .filter(Boolean);

    const existingDeduped = dedupeCaseInsensitive(existingTagTitles);

    const optionSet = new Set(tagOptions.map((tagTitle) => tagTitle.toLowerCase()));
    return existingDeduped.filter((tagTitle) => optionSet.has(tagTitle.toLowerCase()));
  }, [video, tagOptions]);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!open) return;
    setSelected(initialSelected);
  }, [open, initialSelected]);

  const handleSave = () => {
    const videoId = getEntityId(video);
    if (!videoId) return;

    const selectedTitles = dedupeCaseInsensitive(selected);
    if (selectedTitles.length === 0) return;

    const selectedTitlesSet = new Set(selectedTitles.map((tagTitle) => tagTitle.toLowerCase()));

    const selectedTagIds = (allTagEntities ?? [])
      .filter((tagEntity) => selectedTitlesSet.has(getTagTitle(tagEntity).toLowerCase()))
      .map((tagEntity) => getEntityId(tagEntity))
      .filter(Boolean);

    if (selectedTagIds.length === 0) return;

    dispatch({
      type: UPDATE_VIDEO_TAGS,
      payload: { videoId, tagIds: selectedTagIds },
    });

    onClose?.();
  };

  const title = video?.title ? `Tags — ${video.title}` : "Tags";

  const canSave =
    Boolean(getEntityId(video)) &&
    tagOptions.length > 0 &&
    dedupeCaseInsensitive(selected).length > 0 &&
    !isLoading;

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Select from your existing tags.
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Autocomplete
            multiple
            options={tagOptions}
            value={selected}
            onChange={(_, value) => setSelected(dedupeCaseInsensitive(value))}
            filterSelectedOptions
            disableCloseOnSelect
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  size="small"
                  {...getTagProps({ index })}
                  key={`${option}-${index}`}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder={tagOptions.length ? "Search tags…" : "No tags yet"}
                autoFocus
                fullWidth
                error={Boolean(error)}
                helperText={error ? String(error) : " "}
              />
            )}
            disabled={tagOptions.length === 0}
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
