import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistTable from './playlistTable';
import LearnReviewButtonGroup from './learnReviewButtonGroup';
import TagExplanation from './tagExplanation';

export default function MainContent({ active, selectedPlaylist, selectedTag }) {
  if (active === 'tag_view' && selectedTag) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TagExplanation tag={selectedTag?.title} />
        <PlaylistTable playlistId={selectedPlaylist?.id} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <LearnReviewButtonGroup playlistId={selectedPlaylist?.id} />
      <PlaylistTable playlistId={selectedPlaylist?.id} />
    </Box>
  );
}
