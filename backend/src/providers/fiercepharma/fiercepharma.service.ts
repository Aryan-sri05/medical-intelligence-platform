import axios from "axios";
import { parseStringPromise } from "xml2js";

export async function fetchFiercePharmaArticles() {
  const response = await axios.get(
    "https://www.fiercepharma.com/rss/xml"
  );

  const parsed = await parseStringPromise(
    response.data
  );

  const items =
    parsed.rss.channel[0].item || [];

    console.log(
  "RAW DATE:",
  items.pubDate?.[0]
);

  return items.map((item: any) => ({
  title:
    item.title?.[0]?.a?.[0]?._ ||
    "No Title",

  summary:
  item.description?.[0]
    ?.replace(/&amp;/g, "&")
    ?.trim() ||
  "",

  articleUrl:
    item.link?.[0] ||
    "",

  publishedAt: (() => {
  const rawDate = item.pubDate?.[0];

  if (!rawDate) {
    return new Date();
  }

  // Convert:
  // "Jun 22, 2026 11:21am"
  // -> "Jun 22, 2026 11:21 am"
  const normalizedDate = rawDate.replace(
    /(\d)(am|pm)$/i,
    "$1 $2"
  );

  const date = new Date(normalizedDate);

  if (isNaN(date.getTime())) {
    return new Date();
  }

  return date > new Date()
    ? new Date()
    : date;
})(),
}));
}