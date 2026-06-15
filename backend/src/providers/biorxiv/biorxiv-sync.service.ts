import { prisma } from "../../prisma";
import { fetchBioRxivArticles } from "./biorxiv.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncBioRxiv() {
  const data = await fetchBioRxivArticles();

  const articles = data.collection || [];

  let inserted = 0;

  for (const article of articles.slice(0, 10)) {
    const title = article.title;

    const summary =
      article.abstract ||
      "BioRxiv Research Article";

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
    `${title} biology`
  );
    

    await prisma.article.create({
      data: {
        title,
        summary,
        sourceName: "BioRxiv",
        sourceUrl:
          "https://www.biorxiv.org",
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