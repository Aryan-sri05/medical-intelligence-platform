import axios from "axios";
import { parseStringPromise } from "xml2js";

export async function fetchPharmaTimesArticles() {
  const response = await axios.get(
    "https://pharmatimes.com/news/feed/"
  );

  const parsed = await parseStringPromise(
    response.data
  );

  const items =
    parsed.rss.channel[0].item || [];

  return items.slice(0, 25).map((item: any) => ({
    title: item.title?.[0] || "",
    summary:
      item.description?.[0]
        ?.replace(/<[^>]+>/g, "")
        ?.trim() || "",

    articleUrl: item.link?.[0] || "",

    sourceName: "PharmaTimes",

    sourceUrl:
      "https://pharmatimes.com",

    publishedAt:
      item.pubDate?.[0]
        ? new Date(item.pubDate[0])
        : new Date(),
  }));
}