import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { username } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        <h2 className="profile-name">{username}</h2>
        <span className="profile-role">Студент-практикант</span>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">1</span>
            <span className="stat-label">Проект</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">React</span>
            <span className="stat-label">Стек</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">2025</span>
            <span className="stat-label">Год</span>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">🏦 Организация</span>
            <span className="info-value">ПАО Сбербанк</span>
          </div>
          <div className="info-row">
            <span className="info-label">💼 Направление</span>
            <span className="info-value">Программирование</span>
          </div>
          <div className="info-row">
            <span className="info-label">🛠️ Технологии</span>
            <span className="info-value">React, Redux, JS</span>
          </div>
          <div className="info-row">
            <span className="info-label">✅ Статус</span>
            <span className="info-value status-active">Активная сессия</span>
          </div>
        </div>

        <button className="btn-logout-profile" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
