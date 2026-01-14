import { combineReducers } from 'redux';
import videosReducer from './videosReducer';
import playlistsReducer from './playlistReducer';
import tagsReducer from './tagsReducers';

const rootReducer = combineReducers({
  videos: videosReducer,
  playlists: playlistsReducer,
  tags: tagsReducer
});

export default rootReducer;
