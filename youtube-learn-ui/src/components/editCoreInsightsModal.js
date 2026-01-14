import { useEffect, useMemo, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: 'none'
};

export default function EditCoreInsightModal({ open, onClose, video, onSave }) {
  const initialText = useMemo(() => (video?.coreInsight ?? '').trim(), [video]);

  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setText(initialText);
    setSaving(false);
  }, [open, initialText]);

  const handleSave = async () => {
    if (!video?.id) return;

    const coreInsight = text.trim();
    if (!coreInsight) return;

    setSaving(true);
    try {
      await onSave?.({ videoId: video.id, coreInsight });
      onClose?.();
    } finally {
      setSaving(false);
    }
  };

  const title = video?.title ? `Core Insight — ${video.title}` : 'Core Insight';

  return (
    <Modal open={open} onClose={saving ? undefined : onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          What’s the distilled takeaway?
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Core Insight"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. Systems get the outcomes they incentivize."
            multiline
            minRows={3}
            fullWidth
            autoFocus
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button onClick={onClose} disabled={saving} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving || !video?.id || !text.trim()}
              sx={{ textTransform: 'none' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
