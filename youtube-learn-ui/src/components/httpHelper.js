export async function scrapePlaylist(url) {
  const res = await fetch("http://localhost:3001/api/scrapePlaylist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to scrape playlist");
  }

  const data = await res.json();
  console.log(data.videos);
  return data.videos;
}

export async function scrapeVideo(url) {
  const res = await fetch("http://localhost:3001/api/scrapeVideo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
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
