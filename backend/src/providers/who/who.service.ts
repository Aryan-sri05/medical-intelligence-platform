import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchWHOArticles() {
  const response = await axios.get(
    "https://www.who.int/news-room"
  );

  const $ = cheerio.load(response.data);

  const articles: any[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();

    const dateMatch = text.match(
  /^(\d{1,2}\s+[A-Za-z]+\s+\d{4})/
);

const publishedAt = dateMatch?.[1]
  ? new Date(dateMatch[1])
  : null;

  const cleanTitle = text
  .replace(
    /^\d{1,2}\s+[A-Za-z]+\s+\d{4}\s*/,
    ""
  )
  .trim();
    

    if (
      href &&
      href.includes("/news/item/") &&
      text.length > 20
    ) {
      articles.push({
  title: cleanTitle.replace(/\s+/g, " "),
  summary: "WHO News Article",
  sourceName: "WHO",
  sourceUrl: "https://www.who.int",
  articleUrl: `https://www.who.int${href}`,
  publishedAt,
});
    }
  });

  console.log("WHO Articles Found:", articles.length);

  return articles.slice(0, 20);
}