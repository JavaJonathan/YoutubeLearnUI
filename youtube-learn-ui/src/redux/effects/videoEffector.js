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

  UPDATE_VIDEO_IMPACT,
  UPDATE_VIDEO_IMPACT_SUCCESS,
  UPDATE_VIDEO_IMPACT_FAILURE,

  SCRAPE_VIDEO,
  SCRAPE_VIDEO_SUCCESS,
  SCRAPE_VIDEO_FAILURE,

  CREATE_PLAYLIST_WITH_VIDEOS,
  CREATE_PLAYLIST_WITH_VIDEOS_SUCCESS,
  CREATE_PLAYLIST_WITH_VIDEOS_FAILURE
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

    case UPDATE_VIDEO_IMPACT: {
      try {
        const videoId = payload?.videoId;
        const impact = payload?.impact;

        const data = await videoService.updateVideoImpact(videoId, impact);
        dispatch({ type: UPDATE_VIDEO_IMPACT_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: UPDATE_VIDEO_IMPACT_FAILURE, payload: error });
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

    case CREATE_PLAYLIST_WITH_VIDEOS: {
      try {
        const title = payload?.title;
        const videos = payload?.videos;

        const data = await videoService.createPlaylistWithVideos(title, videos);

        dispatch({
          type: CREATE_PLAYLIST_WITH_VIDEOS_SUCCESS,
          payload: data
        });
      } catch (error) {
        dispatch({
          type: CREATE_PLAYLIST_WITH_VIDEOS_FAILURE,
          payload: error
        });
      }
      break;
    }

    default:
      break;
  }
}