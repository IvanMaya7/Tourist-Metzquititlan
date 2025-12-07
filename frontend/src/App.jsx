import { useState, useEffect } from 'react';
import Gastronomy from './pages/Gastronomy';
import History from './pages/History';
import TouristPlaces from './pages/TouristPlace';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';

function App() {
  const [currentView, setCurrentView] = useState('gastronomy');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔍 Verificar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // ✔ Login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // ✔ Logout desde el Sidebar
  const handleLogout = () => {
    localStorage.removeItem("token"); // limpiar token
    setIsAuthenticated(false);        // regresar al login
  };

  // 📌 Renderizado de vistas
  const renderContent = () => {
    switch (currentView) {
      case 'gastronomy':
        return <Gastronomy />;
      case 'history':
        return <History />;
      case 'touristPlaces':
        return <TouristPlaces />;
      case 'users':
        return (
          <div style={{ padding: 40 }}>
            <h1>👥 Gestión de Usuarios (Próximamente)</h1>
          </div>
        );
      default:
        return <Gastronomy />;
    }
  };

  // ⛔ Si NO está autenticado → mostrar Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // ✔ Si está autenticado → mostrar la app
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Pasamos handleLogout al Sidebar */}
      <Sidebar 
        activeView={currentView} 
        onChangeView={setCurrentView} 
        onLogout={handleLogout} 
      />

      <div 
        style={{
          flex: 1,
          marginLeft: '260px',
          padding: '0',
          overflowY: 'auto'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
