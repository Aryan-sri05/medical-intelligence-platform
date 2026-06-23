import { prisma } from "../../prisma";
import { fetchCDSCOArticles } from "./cdsco.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncCDSCO() {
  const articles =
    await fetchCDSCOArticles();

  let inserted = 0;

  for (const article of articles) {
    const exists =
      await prisma.article.findFirst({
        where: {
          articleUrl:
            article.articleUrl,
        },
      });

    if (exists) continue;

    const imageUrl =
  await getUnsplashImage(
    `${article.title} healthcare`
  );

    await prisma.article.create({
      data: {
        title: article.title,
        summary: article.category,
        sourceName: "CDSCO",
        sourceUrl:
          "https://cdsco.gov.in",
        articleUrl:
          article.articleUrl,
        category:
          article.category,
        publishedAt:
          article.publishedAt
            ? new Date(
                article.publishedAt
              )
            : null,
        imageUrl,
      },
    });

    inserted++;
  }

  return {
    fetched:
      articles.length,
    inserted,
  };
}