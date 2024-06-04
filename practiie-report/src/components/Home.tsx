import React from 'react';
import './Home.css';
import { capitalizeFirstLetter } from '../utils/helpers'; // Importa la función capitalizeFirstLetter desde helpers.ts
import TemplateWidget from '../utils/widgets/TemplateWidget';

const Home: React.FC = () => {
  // Obtener el nombre del usuario desde localStorage
  const userName = localStorage.getItem('userName') || '';

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-welcome">
          <h1>Bienvenido a Pract<span>ii</span>eReport</h1>
        </div>
        <div className="profile">
          <img src="/profile-icon.png" alt="Profile Icon" className="profile-icon" />
          <span>{capitalizeFirstLetter(userName)}</span> {/* Mostrar el nombre del usuario */}
        </div>
      </div>
      <div className="home-main">
        <div className="search-section">
          <h2>Qué plantilla buscas hoy?</h2>
          <div className="search-bar">
            <i className="pi pi-search search-icon"></i>
            <input type="text" placeholder="Busca tu plantilla deseada" />
          </div>
        </div>
        <div className="recommendations">
          <h3>Te puede interesar:</h3>
          <div className="templates">
            <TemplateWidget imageSrc="/template-icon.png" />
            <TemplateWidget imageSrc="/template-icon.png" />
            <TemplateWidget imageSrc="/template-icon.png" />
            <TemplateWidget imageSrc="/template-icon.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

