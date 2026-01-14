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
  DELETE_TAG_FAILURE
} from './actionTypes';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case GET_TAGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload
      };
    }

    case GET_TAGS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case CREATE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case CREATE_TAG_SUCCESS: {
      const returnedValue = action.payload;

      const updatedItems = Array.isArray(returnedValue)
        ? returnedValue
        : [...state.items, returnedValue];

      return {
        ...state,
        isLoading: false,
        items: updatedItems
      };
    }

    case CREATE_TAG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case UPDATE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case UPDATE_TAG_SUCCESS: {
      const updatedTag = action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.map(tagEntity =>
          tagEntity.id === updatedTag.id ? { ...tagEntity, ...updatedTag } : tagEntity
        )
      };
    }

    case UPDATE_TAG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case DELETE_TAG: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case DELETE_TAG_SUCCESS: {
      const deletedTagId = action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.filter(tagEntity => tagEntity.id !== deletedTagId)
      };
    }

    case DELETE_TAG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
