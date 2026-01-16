import axios from 'axios';

const BASE_URL = 'https://localhost:7033/api/tags';

export async function getTags() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function createTag(tagName) {
  const trimmedTagName = tagName?.trim();

  if (!trimmedTagName) {
    throw new Error('createTag: tagName is required.');
  }

  const response = await axios.post(BASE_URL, { name: trimmedTagName });
  return response.data;
}
