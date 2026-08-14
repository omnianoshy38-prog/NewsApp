export default async function handler(req, res) {
  const { category = "technology", search } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  let url;

  if (search) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      search
    )}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}