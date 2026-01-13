import {
  ADD_VIDEO,
  REMOVE_VIDEO,
  UPDATE_VIDEO,
  VIDEOS_LOADING,
  VIDEOS_ERROR,
} from "../actionTypes";

// Sync actions
export const addVideo = (video) => ({
  type: ADD_VIDEO,
  payload: video,
});

export const removeVideo = (id) => ({
  type: REMOVE_VIDEO,
  payload: id,
});

export const updateVideo = (video) => ({
  type: UPDATE_VIDEO,
  payload: video, // expects { id, ...fieldsToUpdate } OR full object (your choice)
});

// Optional: status actions (useful for async)
export const setVideosLoading = (isLoading) => ({
  type: VIDEOS_LOADING,
  payload: isLoading,
});

export const setVideosError = (errorMessage) => ({
  type: VIDEOS_ERROR,
  payload: errorMessage,
});

// Example thunk (classic async)
// (later: call backend, or parse YouTube metadata, etc.)
export const fetchVideos = () => async (dispatch) => {
  dispatch(setVideosLoading(true));
  dispatch(setVideosError(null));

  try {
    // Example: replace with your API call
    // const res = await fetch("/api/videos");
    // const data = await res.json();

    const data = []; // placeholder
    // you might add a SET_VIDEOS action if you want to load a list

    dispatch(setVideosLoading(false));
    return data;
  } catch (err) {
    dispatch(setVideosLoading(false));
    dispatch(setVideosError(err?.message || "Failed to load videos"));
  }
};
