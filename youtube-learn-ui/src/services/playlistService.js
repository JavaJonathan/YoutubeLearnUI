import axios from "axios";

const BASE_URL = "/api/playlists";

export async function getPlaylists() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function createPlaylist(title) {
  const trimmedTitle = title?.trim();

  if (!trimmedTitle) {
    throw new Error("createPlaylist: title is required.");
  }

  const response = await axios.post(BASE_URL, { title: trimmedTitle });
  return response.data;
}

export async function addVideoToPlaylist({
  playlistId,
  title,
  link,
  channel,
}) {
  if (!playlistId) {
    throw new Error("addVideoToPlaylist: playlistId is required.");
  }

  const trimmedTitle = title?.trim();
  const trimmedLink = link?.trim();
  const trimmedChannel = channel?.trim();

  if (!trimmedTitle) {
    throw new Error("addVideoToPlaylist: title is required.");
  }

  if (!trimmedLink) {
    throw new Error("addVideoToPlaylist: link is required.");
  }

  const response = await axios.post(
    `${BASE_URL}/${playlistId}/videos`,
    {
      title: trimmedTitle,
      link: trimmedLink,
      channel: trimmedChannel,
    }
  );

  return response.data;
}

export async function removeVideoFromPlaylist(playlistId, videoId) {
  if (!playlistId) {
    throw new Error("removeVideoFromPlaylist: playlistId is required.");
  }

  if (!videoId) {
    throw new Error("removeVideoFromPlaylist: videoId is required.");
  }

  await axios.delete(`${BASE_URL}/${playlistId}/videos/${videoId}`);
}
