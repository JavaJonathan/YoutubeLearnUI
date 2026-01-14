import {
  GET_PLAYLISTS,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAILURE,

  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,

  UPDATE_PLAYLIST,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_FAILURE,

  DELETE_PLAYLIST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILURE,
} from "./actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLISTS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    }

    case GET_PLAYLISTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case CREATE_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case CREATE_PLAYLIST_SUCCESS: {
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue
        : [returnedValue, ...state.items];

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case CREATE_PLAYLIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UPDATE_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UPDATE_PLAYLIST_SUCCESS: {
      const updatedPlaylist = action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.map(playlistEntity =>
          playlistEntity.id === updatedPlaylist.id
            ? { ...playlistEntity, ...updatedPlaylist }
            : playlistEntity
        ),
      };
    }

    case UPDATE_PLAYLIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case DELETE_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case DELETE_PLAYLIST_SUCCESS: {
      const deletedPlaylistId = action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.filter(playlistEntity => playlistEntity.id !== deletedPlaylistId),
      };
    }

    case DELETE_PLAYLIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
