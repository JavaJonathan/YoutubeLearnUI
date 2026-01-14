import { createSelector } from "reselect";

const selectPlaylistsState = (state) => state.playlists;

export const selectPlaylistItems = createSelector(
  [selectPlaylistsState],
  (playlistsState) => playlistsState.items
);

export const selectPlaylistsLoading = createSelector(
  [selectPlaylistsState],
  (playlistsState) => playlistsState.isLoading
);

export const selectPlaylistsError = createSelector(
  [selectPlaylistsState],
  (playlistsState) => playlistsState.error
);

export const selectSelectedPlaylistId = createSelector(
  [selectPlaylistsState],
  (playlistsState) => playlistsState.selectedPlaylistId
);

function getPlaylistId(playlistEntity) {
  return playlistEntity?.id ?? playlistEntity?.Id;
}

export const selectSelectedPlaylist = createSelector(
  [selectPlaylistItems, selectSelectedPlaylistId],
  (playlistEntities, selectedPlaylistId) =>
    playlistEntities.find((playlistEntity) => getPlaylistId(playlistEntity) === selectedPlaylistId) ??
    null
);

export const makeSelectPlaylistById = (playlistId) =>
  createSelector([selectPlaylistItems], (playlistEntities) =>
    playlistEntities.find((playlistEntity) => getPlaylistId(playlistEntity) === playlistId) ?? null
  );
