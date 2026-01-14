import { createSelector } from "reselect";

const selectTagsState = (state) => state.tags;

export const selectTagItems = createSelector(
  [selectTagsState],
  (tagsState) => tagsState.items
);

export const selectTagsLoading = createSelector(
  [selectTagsState],
  (tagsState) => tagsState.isLoading
);

export const selectTagsError = createSelector(
  [selectTagsState],
  (tagsState) => tagsState.error
);

export const selectSelectedTagId = createSelector(
  [selectTagsState],
  (tagsState) => tagsState.selectedTagId
);

function getTagId(tagEntity) {
  return tagEntity?.id ?? tagEntity?.Id;
}

export const selectSelectedTag = createSelector(
  [selectTagItems, selectSelectedTagId],
  (tagEntities, selectedTagId) =>
    tagEntities.find((tagEntity) => getTagId(tagEntity) === selectedTagId) ?? null
);

export const makeSelectTagById = (tagId) =>
  createSelector([selectTagItems], (tagEntities) =>
    tagEntities.find((tagEntity) => getTagId(tagEntity) === tagId) ?? null
  );
