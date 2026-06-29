import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";


const httpsAgent = new https.Agent({
  keepAlive: false,
});
export async function fetchCDSCOArticles() {
  const urls = [
    {
      url: "https://cdsco.gov.in/opencms/opencms/en/Notifications/Public-Notices/",
      category: "Regulatory",
    },
    {
      url: "https://cdsco.gov.in/opencms/opencms/en/Notifications/Circulars/",
      category: "Guidelines",
    },
    {
      url: "https://cdsco.gov.in/opencms/opencms/en/Notifications/Gazette-Notifications/",
      category: "Regulatory",
    },
  ];

  const articles: any[] = [];

  for (const source of urls) {
    const { data } = await axios.get(source.url, {
  httpsAgent,
  timeout: 30000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "close",
  },
});

    const $ = cheerio.load(data);

    $("table tbody tr").each((_, row) => {
      const cells = $(row).find("td");

      const title =
        $(cells[1]).text().trim();

      const date =
        $(cells[2]).text().trim();

      const pdf =
        $(cells[3]).find("a").attr("href");

      if (!title) return;

      articles.push({
        title,
        publishedAt: date,
        articleUrl: pdf
          ? `https://cdsco.gov.in${pdf}`
          : source.url,
        category: source.category,
      });
    });
  }

  const uniqueArticles = Array.from(
  new Map(
    articles.map((article) => [
      article.articleUrl,
      article,
    ])
  ).values()
);

return uniqueArticles;


}