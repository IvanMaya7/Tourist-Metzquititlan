import React from 'react';
import '../styles/Sidebar.css';

// 1. Importamos los iconos que queremos usar
// "Fa" viene de FontAwesome, pero puedes usar otros como "Md" (Material Design)
import { 
  FaUtensils, 
  FaHistory, 
  FaMapMarkedAlt, 
  FaRocket, 
  FaSignOutAlt 
} from "react-icons/fa";

function Sidebar({ onChangeView, activeView }) {
  
  // 2. Modificamos la estructura para separar el icono del texto
  // En lugar de poner el emoji en el string, pasamos el componente del icono
  const menuItems = [
    { id: 'gastronomy', label: 'Gastronomía', icon: <FaUtensils /> },
    { id: 'history', label: 'Historia', icon: <FaHistory /> },
    { id: 'touristPlaces', label: 'Lugares Turísticos', icon: <FaMapMarkedAlt /> }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* Usamos el icono Rocket aquí */}
        <h2>Mi Admin <FaRocket style={{marginLeft: 10}} /></h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-btn ${activeView === item.id ? 'active' : ''}`}
                onClick={() => onChangeView(item.id)}
              >
                {/* 3. Renderizamos el icono antes del texto */}
                <span className="icon-wrapper">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
           {/* Icono de cerrar sesión */}
          <FaSignOutAlt style={{marginRight: 10}} /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;