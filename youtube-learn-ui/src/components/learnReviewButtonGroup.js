import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { GET_VIDEOS } from '../redux/actionTypes';
import { useDispatch } from 'react-redux';

export default function LearnReviewButtonGroup({playlistId}) {
  const [alignment, setAlignment] = useState('learn');
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    dispatch({
          type: GET_VIDEOS,
          payload: {
            playlistId: playlistId,
            tags: [],
            videoView: newAlignment,
            matchAllTags: false,
            page: 1,
            pageSize: 200,
          }
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Learn or Review"
        size="large"
      >
        <ToggleButton value="learn">Learn</ToggleButton>
        <ToggleButton value="review">Review</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
