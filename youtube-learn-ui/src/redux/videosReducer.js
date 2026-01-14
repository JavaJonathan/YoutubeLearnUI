import {
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE,
  ADD_VIDEO,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_FAILURE,
  REMOVE_VIDEO,
  REMOVE_VIDEO_SUCCESS,
  REMOVE_VIDEO_FAILURE,
  UPDATE_VIDEO_CORE_INSIGHT,
  UPDATE_VIDEO_CORE_INSIGHT_SUCCESS,
  UPDATE_VIDEO_CORE_INSIGHT_FAILURE,
  UPDATE_VIDEO_TAGS,
  UPDATE_VIDEO_TAGS_SUCCESS,
  UPDATE_VIDEO_TAGS_FAILURE,
} from "./actionTypes";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export default function videosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload, // full list replace
      };
    }

    case GET_VIDEOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case ADD_VIDEO: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case ADD_VIDEO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: [...state.items, action.payload],
      };
    }

    case ADD_VIDEO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case REMOVE_VIDEO: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case REMOVE_VIDEO_SUCCESS: {
      const removedVideoId = action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.filter(videoEntity => videoEntity.id !== removedVideoId),
      };
    }

    case REMOVE_VIDEO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UPDATE_VIDEO_CORE_INSIGHT: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UPDATE_VIDEO_CORE_INSIGHT_SUCCESS: {
      // Expect payload shape: { videoId, coreInsight } OR { id, coreInsight }
      const updatedVideoId = action.payload.videoId ?? action.payload.id;
      const updatedCoreInsight = action.payload.coreInsight;

      return {
        ...state,
        isLoading: false,
        items: state.items.map(videoEntity =>
          videoEntity.id === updatedVideoId
            ? { ...videoEntity, coreInsight: updatedCoreInsight }
            : videoEntity
        ),
      };
    }

    case UPDATE_VIDEO_CORE_INSIGHT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    
    case UPDATE_VIDEO_TAGS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UPDATE_VIDEO_TAGS_SUCCESS: {
      // Expect payload shape: { videoId, tags } OR { id, tags }
      const updatedVideoId = action.payload.videoId ?? action.payload.id;
      const updatedTags = action.payload.tags;

      return {
        ...state,
        isLoading: false,
        items: state.items.map(videoEntity =>
          videoEntity.id === updatedVideoId
            ? { ...videoEntity, tags: updatedTags }
            : videoEntity
        ),
      };
    }

    case UPDATE_VIDEO_TAGS_FAILURE: {
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
