import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchEMAArticles() {
  const response = await axios.get(
    "https://www.ema.europa.eu/en/news"
  );

  const $ = cheerio.load(response.data);

  const articles: any[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const title = $(el).text().trim();

    if (
      href &&
      href.includes("/en/news/") &&
      title.length > 20
    ) {
      articles.push({
        title,
        summary: "EMA Regulatory Update",
        sourceName: "EMA",
        sourceUrl: "https://www.ema.europa.eu",
        articleUrl: href.startsWith("http")
          ? href
          : `https://www.ema.europa.eu${href}`,
        publishedAt: new Date(),
      });
    }
  });

  return articles.slice(0, 20);
}