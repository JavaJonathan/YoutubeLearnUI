import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  UPDATE_TAG,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILURE,
  DELETE_TAG,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
} from "../actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  selectedTagId: null
};

function getTagId(tagEntity) {
  return tagEntity?.id ?? tagEntity?.Id;
}

function normalizeTagEntity(tagEntity) {
  if (!tagEntity) return tagEntity;

  const id = tagEntity.id ?? tagEntity.Id;
  const title = tagEntity.title ?? tagEntity.Title;

  return {
    ...tagEntity,
    id,
    title,
  };
}

function upsertTagById(tagEntities, updatedTagEntity) {
  const normalizedTag = normalizeTagEntity(updatedTagEntity);
  const updatedTagId = getTagId(normalizedTag);

  if (!updatedTagId) return tagEntities;

  const existingIndex = tagEntities.findIndex(
    (tagEntity) => getTagId(tagEntity) === updatedTagId
  );

  if (existingIndex === -1) {
    return [...tagEntities, normalizedTag];
  }

  return tagEntities.map((tagEntity) =>
    getTagId(tagEntity) === updatedTagId
      ? { ...tagEntity, ...normalizedTag }
      : tagEntity
  );
}

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_TAGS_SUCCESS: {
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue.map(normalizeTagEntity)
        : returnedValue
        ? upsertTagById(state.items, returnedValue)
        : state.items;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case GET_TAGS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case CREATE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case CREATE_TAG_SUCCESS: {
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue.map(normalizeTagEntity)
        : returnedValue
        ? upsertTagById(state.items, returnedValue)
        : state.items;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case CREATE_TAG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UPDATE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UPDATE_TAG_SUCCESS: {
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue.map(normalizeTagEntity)
        : returnedValue
        ? upsertTagById(state.items, returnedValue)
        : state.items;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
      };
    }

    case UPDATE_TAG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case DELETE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case DELETE_TAG_SUCCESS: {
      const deletedTagId =
        action.payload?.id ?? action.payload?.tagId ?? action.payload;

      const updatedItems = state.items.filter(
        (tagEntity) => getTagId(tagEntity) !== deletedTagId
      );

      const updatedSelectedTagId =
        state.selectedTagId === deletedTagId ? null : state.selectedTagId;

      return {
        ...state,
        isLoading: false,
        items: updatedItems,
        selectedTagId: updatedSelectedTagId,
      };
    }

    case DELETE_TAG_FAILURE: {
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
