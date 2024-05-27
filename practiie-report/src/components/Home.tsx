import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="home-header">
                <img src="/logo.png" alt="PractiieReport Logo" className="home-logo" />
                <div className="home-welcome">
                    <h1>Bienvenido a PractiieReport</h1>
                </div>
                <div className="profile">
                    <img src="/profile-icon.png" alt="Profile Icon" className="profile-icon" />
                    <span>Perfil</span>
                </div>
            </div>
            <div className="home-main">
                <h2>¿Qué plantilla buscas hoy?</h2>
                <div className="search-section">
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
                            <button>{'>'}</button>
                        </div>
                        <div className="template">
                            <img src="/template-icon.png" alt="Template Icon" />
                            <button>{'>'}</button>
                        </div>
                        <div className="template">
                            <img src="/template-icon.png" alt="Template Icon" />
                            <button>{'>'}</button>
                        </div>
                        <div className="template">
                            <img src="/template-icon.png" alt="Template Icon" />
                            <button>{'>'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

