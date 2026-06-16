import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search as string;
    const source = req.query.source as string;
    const category = req.query.category as string;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) {
  where.category = category;
}

    if (search) {
      where.title = {
        contains: search,
      };
    }

    if (source) {
      where.sourceName = source;
    }

 

    const articles = await prisma.article.findMany({
      where,
      orderBy: {
          publishedAt: "desc",

      },
      skip,
      take: limit,
    });

    const total = await prisma.article.count({
      where,
    });

    const allMatchingArticles =
  await prisma.article.findMany({
    where,
    select: {
      sourceName: true,
    },
  });

const sourceCounts: Record<
  string,
  number
> = {};

allMatchingArticles.forEach(
  (article) => {
    sourceCounts[
      article.sourceName
    ] =
      (sourceCounts[
        article.sourceName
      ] || 0) + 1;
  }
);

const activeSources =
  Object.keys(sourceCounts).length;

const primarySource =
  Object.entries(sourceCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "N/A";

   res.json({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
  articles,

  stats: {
    activeSources,
    primarySource,
  },
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch articles",
    });
  }
});

export default router;