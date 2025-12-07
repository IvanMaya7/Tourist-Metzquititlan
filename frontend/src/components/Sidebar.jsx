import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { 
  FaUtensils, 
  FaHistory, 
  FaMapMarkedAlt, 
  FaRocket, 
  FaSignOutAlt 
} from "react-icons/fa";

function Sidebar({ onChangeView, activeView, onLogout }) {

  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { id: 'gastronomy', label: 'Gastronomía', icon: <FaUtensils /> },
    { id: 'history', label: 'Historia', icon: <FaHistory /> },
    { id: 'touristPlaces', label: 'Lugares Turísticos', icon: <FaMapMarkedAlt /> }
  ];

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
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
                  <span className="icon-wrapper">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="logout-btn"
            onClick={() => setShowModal(true)}
          >
            <FaSignOutAlt style={{marginRight: 10}} /> 
            Cerrar Sesión
          </button>
        </div>
      </div>


      {/* === MODAL === */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>¿Cerrar sesión?</h3>
            <p>¿Estás seguro de que deseas salir?</p>

            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>

              <button 
                className="btn-confirm"
                onClick={() => {
                  localStorage.removeItem("token");
                  setShowModal(false);
                  onLogout(); // ← REGRESA AL LOGIN
                }}
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
