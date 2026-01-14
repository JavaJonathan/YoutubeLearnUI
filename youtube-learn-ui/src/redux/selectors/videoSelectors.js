import { createSelector } from "reselect";

const selectVideosState = (state) => state.videos;

export const selectVideoItems = createSelector(
  [selectVideosState],
  (videosState) => videosState.items
);

export const selectVideosLoading = createSelector(
  [selectVideosState],
  (videosState) => videosState.isLoading
);

export const selectVideosError = createSelector(
  [selectVideosState],
  (videosState) => videosState.error
);

export const selectVideosPage = createSelector(
  [selectVideosState],
  (videosState) => videosState.page
);

export const selectVideosPageSize = createSelector(
  [selectVideosState],
  (videosState) => videosState.pageSize
);

export const selectVideosTotal = createSelector(
  [selectVideosState],
  (videosState) => videosState.total
);

export const selectIsScrapingVideo = createSelector(
  [selectVideosState],
  (videosState) => videosState.isScraping
);

export const selectScrapedVideo = createSelector(
  [selectVideosState],
  (videosState) => videosState.scrapedVideo
);

export const selectScrapeVideoError = createSelector(
  [selectVideosState],
  (videosState) => videosState.scrapeError
);

function getVideoId(videoEntity) {
  return videoEntity?.id ?? videoEntity?.Id;
}

export const makeSelectVideoById = (videoId) =>
  createSelector([selectVideoItems], (videoEntities) =>
    videoEntities.find((videoEntity) => getVideoId(videoEntity) === videoId) ?? null
  );
