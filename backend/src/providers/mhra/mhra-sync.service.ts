import { prisma } from "../../prisma";
import { fetchMHRAArticles } from "./mhra.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncMHRA() {
  const articles =
    await fetchMHRAArticles();

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
      (await getUnsplashImage(
        `${article.title} medicine`
      )) || "";

      console.log(article.articleUrl);
    await prisma.article.create({
      data: {
        title: article.title,
        summary: article.summary,
        imageUrl,
        sourceName: "MHRA",
        sourceUrl:
          article.sourceUrl,
        articleUrl:
          article.articleUrl,
        publishedAt: new Date(),
        category:
          "Drug Safety",
      },
    });

    inserted++;
  }

  return {
    fetched: articles.length,
    inserted,
  };
}