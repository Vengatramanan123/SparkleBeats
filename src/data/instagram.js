import instagramJson from '../../instagram-data.json';

function buildEmbedUrl(postLink) {
  const match = postLink.match(/instagram\.com\/(?:[^/]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
}

function parseAltText(alt) {
  const dateMatch = alt.match(/on\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})/);
  let date = "Instagram";
  if (dateMatch) {
    const months = ["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    date = `${months[parseInt(dateMatch[1].substring(0,3), 10)]} ${dateMatch[3]}`;
  }

  const isReel = alt.toLowerCase().includes("reel") || alt.includes("Video by");
  const titleMatch = alt.match(/(?:Video|Photo) by .+? on /);
  let title = "Instagram Post";
  if (titleMatch) {
    title = isReel ? "Instagram Reel" : "Instagram Photo";
  }

  return { title, date, isReel };
}

const postThumbnails = instagramJson.images.slice(6, 18);

export const instagramData = [];

const storyImages = instagramJson.images.slice(0, 7);
storyImages.forEach((img, i) => {
  const { title, date, isReel } = parseAltText(img.alt);
  instagramData.push({
    id: `ig-story-${i + 1}`,
    category: "Instagram",
    title: title,
    location: "@djspark.wav",
    date: date,
    aspectRatio: "1/1",
    caption: img.alt,
    accent: ["#8b5cf6", "#c6ff3d", "#a78bfa"][i % 3],
    type: "instagram",
    imageUrl: img.src,
    isReel: false,
  });
});

instagramJson.postLinks.forEach((link, i) => {
  const { title, date, isReel } = parseAltText(postThumbnails[i]?.alt || "");
  const thumbnail = postThumbnails[i];
  instagramData.push({
    id: `ig-${i + 1}`,
    category: "Instagram",
    title: title,
    location: "@djspark.wav",
    date: date,
    aspectRatio: isReel ? "4/5" : "1/1",
    caption: thumbnail?.alt || "",
    accent: ["#8b5cf6", "#c6ff3d", "#a78bfa"][i % 3],
    type: "instagram",
    embedUrl: buildEmbedUrl(link),
    imageUrl: thumbnail?.src || "",
    url: link,
    isReel: isReel,
  });
});
