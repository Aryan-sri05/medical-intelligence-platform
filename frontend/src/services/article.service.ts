import axios from "axios";

const API_URL = "http://localhost:5000";

export const getArticles = async (
  page = 1,
  category = "All",
  search = "",
  source = "All"
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", "5");

  if (category !== "All") {
    params.append("category", category);
  }

  if (search.trim()) {
    params.append("search", search);
  }

  if (source !== "All") {
    params.append("source", source);
  }

  const response = await axios.get(
    `${API_URL}/articles?${params.toString()}`
  );

  return response.data;
};