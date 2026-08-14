import { useEffect, useState } from "react";
import NewsCard from "./newscard";
import '../styles/newslist.css';

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("technology");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  async function getNews(url) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(url);
      const data = await response.json();

      console.log("DATA:", data);

      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to fetch news");
      }

      setNews(data.articles);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // أول ما الصفحة تفتح + كل ما category تتغير
  useEffect(() => {
    getNews(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
  }, [category]);

  function handleSearch() {
    if (!search.trim()) {
      getNews(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      return;
    }

    getNews(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        search
      )}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );
  }

 return (
  <main className="news-container">

    <div className="search-box">
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <button
        onClick={() => {
          setSearch("");
          setCategory("technology");
        }}
      >
        Clear
      </button>
    </div>

    <div className="categories">
      <button onClick={() => setCategory("technology")}>
        Technology
      </button>

      <button onClick={() => setCategory("business")}>
        Business
      </button>

      <button onClick={() => setCategory("sports")}>
        Sports
      </button>

      <button onClick={() => setCategory("health")}>
        Health
      </button>

      <button onClick={() => setCategory("science")}>
        Science
      </button>
    </div>

    {loading && <h2>Loading...</h2>}

    {error && <h2>{error}</h2>}

    {!loading && !error && (
      <>
        <h1 className="news-title">Latest News</h1>

       





        <p className="news-count">
          
        </p>

        <div className="news-grid">
          {news.map((item) => (
            <NewsCard
              key={item.url}
              title={item.title}
              description={item.description}
              image={item.urlToImage}
              url={item.url}
            />
          ))}
        </div>
      </>
    )}

  </main>
);
}

export default NewsList;