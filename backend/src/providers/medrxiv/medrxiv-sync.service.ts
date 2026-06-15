import { prisma } from "../../prisma";
import { fetchMedRxivArticles } from "./medrxiv.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncMedRxiv() {
  const data = await fetchMedRxivArticles();

  const articles = data.collection || [];

  let inserted = 0;

  

  for (const article of articles.slice(0, 10)) {
    const title = article.title;

    const summary =
      article.abstract ||
      "MedRxiv Research Article";

    const articleUrl =
      `https://doi.org/${article.doi}`;

    const exists =
      await prisma.article.findUnique({
        where: {
          articleUrl,
        },
      });

      console.log(article);
    if (exists) continue;

    const imageUrl =
  await getUnsplashImage(
    `${title} healthcare`
  );
    

    await prisma.article.create({
      data: {
        title,
        summary,
        sourceName: "MedRxiv",
        sourceUrl:
          "https://www.medrxiv.org",
        articleUrl,
        category: "Research",
        publishedAt: new Date(),
        imageUrl,
      },
    });

    inserted++;
  }

  return {
    fetched: articles.length,
    inserted,
  };
}