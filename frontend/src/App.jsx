import { useState } from 'react';
import Gastronomy from './pages/Gastronomy'; // Asegúrate de la ruta correcta
import Sidebar from './components/Sidebar';

function App() {
  // Estado para controlar qué vista se muestra
  const [currentView, setCurrentView] = useState('gastronomy');

  // Función para renderizar el contenido dinámicamente
  const renderContent = () => {
    switch (currentView) {
      case 'gastronomy':
        return <Gastronomy />;
      case 'hotels':
        return <div style={{padding: 40}}><h1>🏨 Gestión de Hoteles (Próximamente)</h1></div>;
      case 'tours':
        return <div style={{padding: 40}}><h1>🗺️ Gestión de Tours (Próximamente)</h1></div>;
      case 'users':
        return <div style={{padding: 40}}><h1>👥 Gestión de Usuarios (Próximamente)</h1></div>;
      default:
        return <Gastronomy />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. EL MENÚ LATERAL */}
      <Sidebar 
        activeView={currentView} 
        onChangeView={setCurrentView} 
      />

      {/* 2. EL CONTENIDO PRINCIPAL */}
      <div style={{ 
        flex: 1,           // Toma el resto del ancho
        marginLeft: '260px', // Deja espacio para el sidebar (mismo ancho que en CSS)
        padding: '0',      // El padding ya lo tiene Gastronomy.css
        overflowY: 'auto'  // Permite scroll si el contenido es largo
      }}>
        {renderContent()}
      </div>

    </div>
  );
}

export default App;