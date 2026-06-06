import { useEffect, useState } from 'react';
import './Movies.css';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ru-RU`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.results) setMovies(data.results.slice(0, 18));
        else setError('Не удалось загрузить фильмы');
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка соединения с API');
        setLoading(false);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Фильмы</h1>
        <p>Популярные фильмы из The Movie Database</p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Найти фильм..."
          />
          <button type="submit">Найти</button>
          {query && (
            <button type="button" className="btn-reset" onClick={() => { setQuery(''); setSearch(''); }}>
              ✕
            </button>
          )}
        </form>
      </div>

      {loading && (
        <div className="movies-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {error && <div className="movies-error">⚠️ {error}</div>}

      {!loading && !error && movies.length === 0 && (
        <div className="movies-empty">Ничего не найдено по запросу «{query}»</div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                {movie.poster_path ? (
                  <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} loading="lazy" />
                ) : (
                  <div className="no-poster">🎬</div>
                )}
                <div className="movie-rating">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span className="movie-year">
                  {movie.release_date ? movie.release_date.slice(0, 4) : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
