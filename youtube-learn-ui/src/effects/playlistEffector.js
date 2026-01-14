import * as playlistService from '../services/playlistService';
import {
  GET_PLAYLISTS,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAILURE,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  ADD_VIDEO,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_FAILURE,
  REMOVE_VIDEO,
  REMOVE_VIDEO_SUCCESS,
  REMOVE_VIDEO_FAILURE
} from '../redux/actionTypes';

export async function playlistEffector(action, dispatch) {
  const payload = action?.payload;

  switch (action.type) {
    case GET_PLAYLISTS: {
      try {
        const playlists = await playlistService.getPlaylists();
        dispatch({ type: GET_PLAYLISTS_SUCCESS, payload: playlists });
      } catch (error) {
        dispatch({ type: GET_PLAYLISTS_FAILURE, payload: error });
      }
      break;
    }

    case CREATE_PLAYLIST: {
      try {
        const title = typeof payload === 'string' ? payload : payload?.title;

        const playlists = await playlistService.createPlaylist(title);
        dispatch({ type: CREATE_PLAYLIST_SUCCESS, payload: playlists });
      } catch (error) {
        dispatch({ type: CREATE_PLAYLIST_FAILURE, payload: error });
      }
      break;
    }

    case ADD_VIDEO: {
      try {
        const data = await playlistService.addVideoToPlaylist({
          playlistId: payload?.playlistId,
          title: payload?.title,
          link: payload?.link,
          channel: payload?.channel
        });

        dispatch({ type: ADD_VIDEO_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ADD_VIDEO_FAILURE, payload: error });
      }
      break;
    }

    case REMOVE_VIDEO: {
      try {
        const playlistId = payload?.playlistId;
        const videoId = payload?.videoId;

        await playlistService.removeVideoFromPlaylist(playlistId, videoId);

        dispatch({
          type: REMOVE_VIDEO_SUCCESS,
          payload: { playlistId, videoId }
        });
      } catch (error) {
        dispatch({ type: REMOVE_VIDEO_FAILURE, payload: error });
      }
      break;
    }

    default:
      break;
  }
}
