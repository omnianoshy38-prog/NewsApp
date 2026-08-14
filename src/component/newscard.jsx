import { useState } from 'react'

function NewsCard({ title, description, image }) {
  const [favorite, setFavorite] = useState(false)

  function handleFavorite() {
    setFavorite(!favorite)
  }

  return (
    <article>
      <img src={image} alt={title} />

      <h2>{title}</h2>

      <p>{description}</p>

      <button onClick={handleFavorite}>
        {favorite ? '♥ Favorited' : '♡ Favorite'}
      </button>
    </article>
  )
}

export default NewsCard