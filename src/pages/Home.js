import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

export default function Home() {
  const { isAuthenticated, username } = useSelector(s => s.auth);

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-badge">Учебная практика · Сбер</div>
        <h1 className="hero-title">
          {isAuthenticated ? `Привет, ${username}! 👋` : 'Добро пожаловать'}
        </h1>
        <p className="hero-subtitle">
          Демонстрационное приложение с авторизацией, списком фильмов и переключением темы.
          Разработано в рамках студенческой практики.
        </p>
        <div className="hero-buttons">
          <Link to="/movies" className="btn-primary">Смотреть фильмы</Link>
          {!isAuthenticated && <Link to="/login" className="btn-secondary">Войти в профиль</Link>}
          {isAuthenticated && <Link to="/profile" className="btn-secondary">Мой профиль</Link>}
        </div>
      </div>

      <div className="home-cards">
        <div className="feature-card">
          <div className="card-icon">🔐</div>
          <h3>Авторизация</h3>
          <p>Защищённый профиль с Redux-хранилищем и сохранением сессии</p>
        </div>
        <div className="feature-card">
          <div className="card-icon">🎬</div>
          <h3>Фильмы</h3>
          <p>Реальные данные из The Movie Database API с постерами и рейтингами</p>
        </div>
        <div className="feature-card">
          <div className="card-icon">🌗</div>
          <h3>Смена темы</h3>
          <p>Светлый и тёмный режим с сохранением выбора пользователя</p>
        </div>
      </div>
    </div>
  );
}
