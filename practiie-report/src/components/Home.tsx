// src/views/HomeView.tsx
import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-welcome">
          <h1>Bienvenido a Pract<span>ii</span>eReport</h1>
        </div>
        <div className="profile">
          <img src="/profile-icon.png" alt="Profile Icon" className="profile-icon" />
          <span>Perfil</span>
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
            <div className="template">
              <img src="/template-icon.png" alt="Template Icon" />
            </div>
            <div className="template">
              <img src="/template-icon.png" alt="Template Icon" />
            </div>
            <div className="template">
              <img src="/template-icon.png" alt="Template Icon" />
            </div>
            <div className="template">
              <img src="/template-icon.png" alt="Template Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
