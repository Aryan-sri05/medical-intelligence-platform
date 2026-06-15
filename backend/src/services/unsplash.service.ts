import axios from "axios";

export async function getUnsplashImage(
  query: string
) {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    return (
      response.data.results?.[0]?.urls?.regular ||
      null
    );
  } catch {
    return null;
  }
}