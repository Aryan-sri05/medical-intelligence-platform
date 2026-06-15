import { prisma } from "../../prisma";
import { fetchCDCArticles } from "./cdc.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncCDC() {
  const data = await fetchCDCArticles();

  const results = data.results || [];

  let inserted = 0;

  for (const item of results.slice(0, 10)) {
    const title =
      item.name || "CDC News";

    const summary =
      item.description || "CDC Update";

    const articleUrl =
      item.sourceUrl ||
      item.url ||
      `https://www.cdc.gov`;

    const exists =
      await prisma.article.findFirst({
        where: {
          articleUrl,
        },
      });

      console.log(results[0]);
    if (exists) continue;

    const imageUrl =
  await getUnsplashImage(
    `${title} public health`
  );

    await prisma.article.create({
      data: {
        title,
        summary,
        imageUrl,
        sourceName: "CDC",
        sourceUrl:
          "https://www.cdc.gov",
        articleUrl,
        category: "Drug Safety",
        publishedAt: item.datePublished
      ? new Date(item.datePublished)
      : null,
      },
    });

    inserted++;
  }

  return {
    fetched: results.length,
    inserted,
  };
}