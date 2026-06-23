import { prisma } from "../../prisma";
import { fetchFiercePharmaArticles } from "./fiercepharma.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncFiercePharma() {
  const items =
    await fetchFiercePharmaArticles();

  let inserted = 0;

  for (const item of items) {
    const articleUrl =
  item.articleUrl || "";

    if (!articleUrl) continue;

    const exists =
      await prisma.article.findFirst({
        where: {
          articleUrl,
        },
      });

    if (exists) continue;

   

    const imageUrl =
  (await getUnsplashImage(
    `${item.title} pharma`
  )) || "";

    await prisma.article.create({
      data: {
        title: item.title,

        summary:
  item.summary ||
  "Industry Update",

        sourceName:
          "Fierce Pharma",

        sourceUrl:
          "https://www.fiercepharma.com",

        articleUrl,

        category:
          "Industry Update",

        imageUrl,

        publishedAt:
  item.publishedAt,
      },
    });

    inserted++;
  }

  return {
    fetched: items.length,
    inserted,
  };
}