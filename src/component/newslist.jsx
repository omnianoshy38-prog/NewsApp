import { useEffect, useState } from 'react'
import NewsCard from './newscard'

function NewsList() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY

  useEffect(() => {
    async function getNews() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=eg&category=technology&apiKey=${API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }

        const data = await response.json()

        setNews(data.articles)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getNews()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <main>
      {news.map((item) => (
        <NewsCard
          key={item.url}
          title={item.title}
          description={item.description}
          image={item.urlToImage}
        />
      ))}
    </main>
  )
}

export default NewsList