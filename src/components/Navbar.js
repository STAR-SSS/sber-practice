import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import { useTheme } from '../ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, username } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">СберПрактика</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Главная</Link>
          <Link to="/movies" className={`nav-link ${isActive('/movies') ? 'active' : ''}`}>Фильмы</Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>Профиль</Link>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="user-name">{username}</span>
              <button className="btn-logout" onClick={() => dispatch(logout())}>Выйти</button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">Войти</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
