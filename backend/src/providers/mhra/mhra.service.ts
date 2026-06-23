import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchMHRAArticles() {
  const response = await axios.get(
    "https://www.gov.uk/drug-safety-update"
  );

  const $ = cheerio.load(response.data);

  console.log(
  "Document items:",
  $(".gem-c-document-list__item").length
);

  const articles: any[] = [];

  $(".gem-c-document-list__item").each((_, el) => {
  const title = $(el)
    .find("a")
    .first()
    .text()
    .trim();

  const href = $(el)
    .find("a")
    .first()
    .attr("href");

  const summary = $(el)
    .text()
    .trim();

  if (!title || !href) return;

  articles.push({
    title,
    summary,
    articleUrl: href.startsWith("http")
      ? href
      : `https://www.gov.uk${href}`,
    sourceName: "MHRA",
    sourceUrl:
      "https://www.gov.uk/drug-safety-update",
  });
});

const urls = new Set();

for (const article of articles) {
  if (urls.has(article.articleUrl)) {
    console.log("DUPLICATE:", article.articleUrl);
  }

  urls.add(article.articleUrl);
}

console.log("Total articles:", articles.length);

articles.slice(0, 10).forEach((a) => {
  console.log(a.articleUrl);
});

  return articles.slice(0, 25);
}