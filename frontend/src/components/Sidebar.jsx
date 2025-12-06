import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ onChangeView, activeView }) {
  
  const menuItems = [
    { id: 'gastronomy', label: '🍽️ Gastronomía' },
    { id: 'hotels', label: '🏨 Hoteles' }, // Ejemplos futuros
    { id: 'tours', label: '🗺️ Tours' },     // Ejemplos futuros
    { id: 'users', label: '👥 Usuarios' },   // Ejemplos futuros
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Mi Admin 🚀</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-btn ${activeView === item.id ? 'active' : ''}`}
                onClick={() => onChangeView(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;