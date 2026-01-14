import axios from "axios";

const BASE_URL = "/api/tags";

export async function createTag(tagName) {
  const trimmedTagName = tagName?.trim();

  if (!trimmedTagName) {
    throw new Error("createTag: tagName is required.");
  }

  const response = await axios.post(BASE_URL, { name: trimmedTagName });
  return response.data;
}
