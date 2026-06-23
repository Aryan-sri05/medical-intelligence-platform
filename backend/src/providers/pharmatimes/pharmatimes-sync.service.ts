import { prisma } from "../../prisma";
import { fetchPharmaTimesArticles } from "./pharmatimes.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncPharmaTimes() {
  const articles =
    await fetchPharmaTimesArticles();

  let inserted = 0;

  for (const article of articles) {
    try {
      await prisma.article.create({
        data: {
          title: article.title,
          summary: article.summary,
          imageUrl:
            (await getUnsplashImage(
              `${article.title} pharma`
            )) || "",

          sourceName: "PharmaTimes",

          sourceUrl:
            article.sourceUrl,

          articleUrl:
            article.articleUrl,

          publishedAt:
            article.publishedAt,

          category:
            "Industry Update",
        },
      });

      inserted++;
    } catch {
      continue;
    }
  }

  return {
    fetched: articles.length,
    inserted,
  };
}