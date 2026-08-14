import { useState } from "react";
import "../styles/newscard.css";

function NewsCard({ title, description, image, url }) {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorite);
  }

  return (
    <article className="news-card">
      {image && (
        <img
          src={image}
          alt={title}
          className="news-image"
          width="300"
        />
      )}

      <h2 className="news-content">{title}</h2>

      <p className="news-actions">{description}</p>

      <button  className="favorite-btn" onClick={handleFavorite}>
        {favorite ? "♥ Favorited" : "♡ Favorite"}
      </button>

      <a className="read-more"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read More
      </a>
    </article>
  );
}

export default NewsCard;