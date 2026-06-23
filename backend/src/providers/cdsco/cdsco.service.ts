import axios from "axios";
import * as cheerio from "cheerio";

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
    const { data } = await axios.get(source.url);

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

  return articles;
}