import axios from "axios";

const VIDEO_BASE_URL = "https://localhost:7033/api/video";
const PLAYLIST_BASE_URL = "https://localhost:7033/api/playlists";

export async function getVideos({
  playlistId,
  tags,
  matchAllTags = false,
  page = 1,
  pageSize = 100,
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

  const response = await axios.get(`${VIDEO_BASE_URL}?${queryParams.toString()}`);
  return response.data;
}

export async function updateCoreInsights(videoId, coreInsights) {
  if (!videoId) throw new Error("videoId is required.");
  if (!coreInsights) throw new Error("coreInsights is required.");

  const response = await axios.post(`${VIDEO_BASE_URL}/${videoId}/core-insights`, {
    coreInsights,
  });

  return response.data;
}

export async function updateVideoTags(videoId, tagIds) {
  if (!videoId) throw new Error("videoId is required.");
  if (!Array.isArray(tagIds) || tagIds.length === 0) {
    throw new Error("tagIds must be a non-empty array.");
  }

  const response = await axios.put(`${VIDEO_BASE_URL}/${videoId}/tags`, {
    tags: tagIds,
  });

  return response.data;
}

export async function createPlaylistWithVideos(title, videos) {
  if (videos.length === 0) {
    throw new Error("videos must include at least one item with a valid link/url.");
  }

  const response = await axios.post(`${PLAYLIST_BASE_URL}/bulkUploadVideos`, {
    title: title.trim(),
    videos
  });

  return response.data;
}

export async function scrapeVideo(url) {
  const res = await fetch("http://localhost:3001/api/scrapeVideo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to scrape video");
  }

  const data = await res.json();

  return {
    title: data.title?.trim(),
    channel: data.channel?.trim(),
    url: data.url,
  };
}

export async function scrapePlaylist(url) {
  const res = await fetch("http://localhost:3001/api/scrapePlaylist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to scrape playlist");
  }

  const data = await res.json();
  return data.videos;
}
