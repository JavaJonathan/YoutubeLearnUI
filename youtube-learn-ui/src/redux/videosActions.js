import {
  ADD_VIDEO,
  REMOVE_VIDEO,
  UPDATE_VIDEO,
  VIDEOS_LOADING,
  VIDEOS_ERROR
} from '../actionTypes';

export const addVideo = video => ({
  type: ADD_VIDEO,
  payload: video
});

export const removeVideo = id => ({
  type: REMOVE_VIDEO,
  payload: id
});

export const updateVideo = video => ({
  type: UPDATE_VIDEO,
  payload: video
});

export const setVideosLoading = isLoading => ({
  type: VIDEOS_LOADING,
  payload: isLoading
});

export const setVideosError = errorMessage => ({
  type: VIDEOS_ERROR,
  payload: errorMessage
});
