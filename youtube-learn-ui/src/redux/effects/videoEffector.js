import * as videoService from '../../services/videoService';
import {
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE,
  UPDATE_VIDEO_CORE_INSIGHT,
  UPDATE_VIDEO_CORE_INSIGHT_SUCCESS,
  UPDATE_VIDEO_CORE_INSIGHT_FAILURE,
  UPDATE_VIDEO_TAGS,
  UPDATE_VIDEO_TAGS_SUCCESS,
  UPDATE_VIDEO_TAGS_FAILURE,
  SCRAPE_VIDEO,
  SCRAPE_VIDEO_SUCCESS,
  SCRAPE_VIDEO_FAILURE
} from '../actionTypes';

export async function videoEffector(action, dispatch) {
  const payload = action?.payload;

  switch (action.type) {
    case GET_VIDEOS: {
      try {
        const data = await videoService.getVideos(payload);
        dispatch({ type: GET_VIDEOS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_VIDEOS_FAILURE, payload: error });
      }
      break;
    }

    case UPDATE_VIDEO_CORE_INSIGHT: {
      try {
        const videoId = payload?.videoId;
        const coreInsights = payload?.coreInsights;

        const data = await videoService.updateCoreInsights(videoId, coreInsights);
        dispatch({ type: UPDATE_VIDEO_CORE_INSIGHT_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: UPDATE_VIDEO_CORE_INSIGHT_FAILURE, payload: error });
      }
      break;
    }

    case UPDATE_VIDEO_TAGS: {
      try {
        const videoId = payload?.videoId;
        const tagIds = payload?.tagIds;

        const data = await videoService.updateVideoTags(videoId, tagIds);
        dispatch({ type: UPDATE_VIDEO_TAGS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: UPDATE_VIDEO_TAGS_FAILURE, payload: error });
      }
      break;
    }

    case SCRAPE_VIDEO: {
      try {
        const data = await videoService.scrapeVideo(payload);
        dispatch({ type: SCRAPE_VIDEO_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: SCRAPE_VIDEO_FAILURE, payload: error });
      }
      break;
    }

    default:
      break;
  }
}
