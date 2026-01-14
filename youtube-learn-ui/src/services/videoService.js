import axios from "axios";

const BASE_URL = "/api/video";

export async function getVideos({
  playlistId,
  tags,
  matchAllTags = false,
  page = 1,
  pageSize = 50,
} = {}) {
  const queryParams = new URLSearchParams();

  if (playlistId) queryParams.set("playlistId", playlistId);

  if (Array.isArray(tags) && tags.length > 0) {
    tags.forEach((tagName) => {
      if (tagName) queryParams.append("tags", tagName);
    });
  }

  queryParams.set("matchAllTags", String(matchAllTags));
  queryParams.set("page", String(page));
  queryParams.set("pageSize", String(pageSize));

  const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
  return response.data;
}

export async function updateCoreInsights(videoId, coreInsights) {
  if (!videoId) throw new Error("videoId is required.");
  if (!coreInsights) throw new Error("coreInsights is required.");

  const response = await axios.post(
    `${BASE_URL}/${videoId}/core-insights`,
    { coreInsights }
  );

  return response.data;
}

export async function updateVideoTags(videoId, tagIds) {
  if (!videoId) throw new Error("videoId is required.");
  if (!Array.isArray(tagIds) || tagIds.length === 0) {
    throw new Error("tagIds must be a non-empty array.");
  }

  const response = await axios.put(
    `${BASE_URL}/${videoId}/tags`,
    { tags: tagIds }
  );

  return response.data;
}
