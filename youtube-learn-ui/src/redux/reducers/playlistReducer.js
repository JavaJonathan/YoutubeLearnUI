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

  CREATE_PLAYLIST_WITH_VIDEOS,
  CREATE_PLAYLIST_WITH_VIDEOS_SUCCESS,
  CREATE_PLAYLIST_WITH_VIDEOS_FAILURE,

  UPDATE_PLAYLIST_CORE_INSIGHTS,
  UPDATE_PLAYLIST_CORE_INSIGHTS_SUCCESS,
  UPDATE_PLAYLIST_CORE_INSIGHTS_FAILURE,
} from "../actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  selectedPlaylistId: null,
};

function normalizePlaylistEntity(playlistEntity) {
  if (!playlistEntity) return playlistEntity;

  const id = playlistEntity.id ?? playlistEntity.Id;
  const title = playlistEntity.title ?? playlistEntity.Title;
  const createdAt = playlistEntity.createdAt ?? playlistEntity.CreatedAt;

  const coreInsights =
    playlistEntity.coreInsights ?? playlistEntity.CoreInsights ?? null;

  return {
    ...playlistEntity,
    id,
    title,
    createdAt,
    coreInsights,
  };
}

function upsertPlaylistById(playlistEntities, updatedPlaylistEntity) {
  const updatedPlaylistId = updatedPlaylistEntity.id;

  if (!updatedPlaylistId) return playlistEntities;

  const existingIndex = playlistEntities.findIndex(
    (playlistEntity) => playlistEntity.id === updatedPlaylistId
  );

  if (existingIndex === -1) {
    return [updatedPlaylistEntity, ...playlistEntities];
  }

  return playlistEntities.map((playlistEntity) =>
    playlistEntity.id === updatedPlaylistId
      ? { ...playlistEntity, ...updatedPlaylistEntity }
      : playlistEntity
  );
}

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
        ? returnedValue.map(normalizePlaylistEntity)
        : returnedValue
        ? upsertPlaylistById(state.items, returnedValue)
        : state.items;

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

    case CREATE_PLAYLIST_WITH_VIDEOS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case CREATE_PLAYLIST_WITH_VIDEOS_SUCCESS: {
      const createdPlaylist = action.payload?.playlist;

      const updatedItems = createdPlaylist
        ? upsertPlaylistById(state.items, createdPlaylist)
        : state.items;

      const createdPlaylistId = createdPlaylist.id;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
        selectedPlaylistId: createdPlaylistId ?? state.selectedPlaylistId,
      };
    }

    case CREATE_PLAYLIST_WITH_VIDEOS_FAILURE: {
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
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue.map(normalizePlaylistEntity)
        : returnedValue
        ? upsertPlaylistById(state.items, returnedValue)
        : state.items;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case UPDATE_PLAYLIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UPDATE_PLAYLIST_CORE_INSIGHTS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UPDATE_PLAYLIST_CORE_INSIGHTS_SUCCESS: {
      const updatedPlaylist = action.payload;

      const updatedItems = updatedPlaylist
        ? upsertPlaylistById(state.items, updatedPlaylist)
        : state.items;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case UPDATE_PLAYLIST_CORE_INSIGHTS_FAILURE: {
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
      const deletedPlaylistId =
        action.payload?.id ?? action.payload?.playlistId ?? action.payload;

      const updatedItems = state.items.filter(
        (playlistEntity) => playlistEntity.id !== deletedPlaylistId
      );

      const updatedSelectedPlaylistId =
        state.selectedPlaylistId === deletedPlaylistId
          ? null
          : state.selectedPlaylistId;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
        selectedPlaylistId: updatedSelectedPlaylistId,
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
