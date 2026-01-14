import { useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

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

function toTagName(t) {
  return typeof t === "string" ? t : t?.name;
}

function dedupeCaseInsensitive(arr) {
  const seen = new Set();
  const out = [];
  for (const s of arr) {
    const v = (s ?? "").trim();
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

export default function EditVideoTagsModal({
  open,
  onClose,
  video,
  allTags = ["Time Horizons", "Incentives", "Tradeoffs", "Constraints"],
  onSave,
}) {
  const tagOptions = useMemo(() => {
    const names = (allTags ?? []).map(toTagName).filter(Boolean);
    return dedupeCaseInsensitive(names).sort((a, b) => a.localeCompare(b));
  }, [allTags]);

  const initialSelected = useMemo(() => {
    const existing = (video?.tags ?? []).map(toTagName).filter(Boolean);
    const existingDedup = dedupeCaseInsensitive(existing);

    const optionSet = new Set(tagOptions.map((t) => t.toLowerCase()));
    return existingDedup.filter((t) => optionSet.has(t.toLowerCase()));
  }, [video, tagOptions]);

  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelected(initialSelected);
    setSaving(false);
  }, [open, initialSelected]);

  const handleSave = async () => {
    if (!video?.id) return;

    const tags = dedupeCaseInsensitive(selected);
    if (tags.length === 0) return;

    setSaving(true);
    try {
      await onSave?.({ videoId: video.id, tags });
      onClose?.();
    } finally {
      setSaving(false);
    }
  };

  const title = video?.title ? `Tags — ${video.title}` : "Tags";

  return (
    <Modal open={open} onClose={saving ? undefined : onClose}>
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
            renderValue={(value, getTagProps) =>
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
              />
            )}
            disabled={tagOptions.length === 0}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={onClose} disabled={saving} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={
                saving ||
                !video?.id ||
                tagOptions.length === 0 ||
                dedupeCaseInsensitive(selected).length === 0
              }
              sx={{ textTransform: "none" }}
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
