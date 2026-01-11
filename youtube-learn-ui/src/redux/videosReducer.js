import {
  ADD_VIDEO,
  REMOVE_VIDEO,
  UPDATE_VIDEO,
  VIDEOS_LOADING,
  VIDEOS_ERROR,
} from "./actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export default function videosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_VIDEO: {
      return {
        ...state,
        items: state.items.filter((v) => v.id !== action.payload),
      };
    }

    case UPDATE_VIDEO: {
      const updated = action.payload; // { id, ... }
      return {
        ...state,
        items: state.items.map((v) =>
          v.id === updated.id ? { ...v, ...updated } : v
        ),
      };
    }

    case VIDEOS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case VIDEOS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
