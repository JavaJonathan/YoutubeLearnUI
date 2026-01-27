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
  SCRAPE_VIDEO,
  SCRAPE_VIDEO_SUCCESS,
  SCRAPE_VIDEO_FAILURE,
} from "../actionTypes";

const initialState = {
  items: [],
  page: 1,
  pageSize: 50,
  total: 0,
  isLoading: false,
  error: null,
  isScraping: false,
  scrapeError: null,
  scrapedVideo: null
};

function upsertVideoById(videoEntities, updatedVideoEntity) {
  const updatedVideoId = updatedVideoEntity.id;

  if (!updatedVideoId) return videoEntities;

  const existingIndex = videoEntities.findIndex(
    (videoEntity) => videoEntity.id === updatedVideoId
  );

  if (existingIndex === -1) {
    return [updatedVideoEntity, ...videoEntities];
  }

  return videoEntities.map((videoEntity) =>
    videoEntity.id === updatedVideoId ? { ...videoEntity, ...updatedVideoEntity } : videoEntity
  );
}

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
      const payload = action.payload ?? {};

      return {
        ...state,
        isLoading: false,
        items: payload.items ?? [],
        page: payload.page ?? state.page,
        pageSize: payload.pageSize ?? state.pageSize,
        total: payload.total ?? state.total,
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
        items: upsertVideoById(state.items, action.payload),
        total: state.total + 1,
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
      const removedVideoId =
        action.payload?.videoId ?? action.payload?.id ?? action.payload;

      return {
        ...state,
        isLoading: false,
        items: state.items.filter(
          (videoEntity) => videoEntity.id !== removedVideoId
        ),
        total: Math.max(0, state.total - 1),
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
      const updatedVideoId = action.payload?.videoId ?? action.payload?.id;
      const updatedCoreInsights =
        action.payload?.coreInsights ?? action.payload?.coreInsightsJson;

      return {
        ...state,
        isLoading: false,
        items: state.items.map((videoEntity) =>
          videoEntity.id === updatedVideoId
            ? {
                ...videoEntity,
                coreInsights: updatedCoreInsights,
                coreInsightsJson: updatedCoreInsights,
              }
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
      const updatedVideoId = action.payload?.videoId ?? action.payload?.id;
      const updatedTags = action.payload?.tags ?? action.payload?.Tags ?? [];

      return {
        ...state,
        isLoading: false,
        items: state.items.map((videoEntity) =>
          videoEntity.id === updatedVideoId
            ? { ...videoEntity, tags: updatedTags, Tags: updatedTags }
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

    case SCRAPE_VIDEO: {
      return {
        ...state,
        isScraping: true,
        scrapeError: null,
        scrapedVideo: null,
      };
    }

    case SCRAPE_VIDEO_SUCCESS: {
      // Most sane expectation: payload is scraped video metadata
      // Example: { title, channel, link, thumbnailUrl, ... }
      return {
        ...state,
        isScraping: false,
        scrapedVideo: action.payload,
      };
    }

    case SCRAPE_VIDEO_FAILURE: {
      return {
        ...state,
        isScraping: false,
        scrapeError: action.payload,
      };
    }

    default:
      return state;
  }
}
