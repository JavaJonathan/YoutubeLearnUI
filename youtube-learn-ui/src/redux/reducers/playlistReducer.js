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
} from "../actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  selectedPlaylistId: null
};

function getPlaylistId(playlistEntity) {
  return playlistEntity?.id ?? playlistEntity?.Id;
}

function normalizePlaylistEntity(playlistEntity) {
  if (!playlistEntity) return playlistEntity;

  const id = playlistEntity.id ?? playlistEntity.Id;
  const title = playlistEntity.title ?? playlistEntity.Title;
  const createdAt = playlistEntity.createdAt ?? playlistEntity.CreatedAt;

  return {
    ...playlistEntity,
    id,
    title,
    createdAt,
  };
}

function upsertPlaylistById(playlistEntities, updatedPlaylistEntity) {
  const normalizedPlaylist = normalizePlaylistEntity(updatedPlaylistEntity);
  const updatedPlaylistId = getPlaylistId(normalizedPlaylist);

  if (!updatedPlaylistId) return playlistEntities;

  const existingIndex = playlistEntities.findIndex(
    (playlistEntity) => getPlaylistId(playlistEntity) === updatedPlaylistId
  );

  if (existingIndex === -1) {
    return [normalizedPlaylist, ...playlistEntities];
  }

  return playlistEntities.map((playlistEntity) =>
    getPlaylistId(playlistEntity) === updatedPlaylistId
      ? { ...playlistEntity, ...normalizedPlaylist }
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
        (playlistEntity) => getPlaylistId(playlistEntity) !== deletedPlaylistId
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
