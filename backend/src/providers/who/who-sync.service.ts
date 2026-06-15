import { prisma } from "../../prisma";
import { fetchWHOArticles } from "./who.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncWHOArticles() {
  const articles =
    await fetchWHOArticles();

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
    `${article.title} global health`
  );

    await prisma.article.create({
  data: {
    title: article.title,
    summary: article.summary,
    imageUrl,
    sourceName: article.sourceName,
    sourceUrl: article.sourceUrl,
    articleUrl: article.articleUrl,
    publishedAt: article.publishedAt,
    category: "Guidelines",
  },
});

    inserted++;
  }

  return {
    fetched: articles.length,
    inserted,
  };
}