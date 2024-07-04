import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import TemplateWidget from '../utils/widgets/TemplateWidget';

const Settings: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('tu-informacion');
    const navigate = useNavigate();

    const handleMenuClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    const usedTemplates = JSON.parse(localStorage.getItem('usedTemplates') || '[]');

    return (
        <div className="settings-container">
            <div className="settings-sidebar">
                <div>
                    <h2>Tu y PractiieReport</h2>
                    <ul>
                        <li onClick={() => handleMenuClick('tu-informacion')} className={selectedOption === 'tu-informacion' ? 'active' : ''}>Tu Información</li>
                        <li onClick={() => handleMenuClick('tus-plantillas')} className={selectedOption === 'tus-plantillas' ? 'active' : ''}>Tus Plantillas</li>
                    </ul>
                </div>
                <div className="settings-buttons">
                    <button onClick={handleLogout} className="settings-button">Log Out</button>
                    <button onClick={handleGoHome} className="settings-button">Volver</button>
                </div>
            </div>
            <div className="settings-content">
                {selectedOption === 'tu-informacion' && (
                    <div>
                        <h2>Tu Información</h2>
                        <p>Aquí puedes ver y editar tu información personal.</p>
                        {/* Contenido adicional para "Tu Información" */}
                    </div>
                )}
                {selectedOption === 'tus-plantillas' && (
                    <div>
                        <h2>Tus Plantillas</h2>
                        <div className="templates">
                            {usedTemplates.length > 0 ? (
                                usedTemplates.map((template: { id: number; name: string; }) => (
                                    <TemplateWidget
                                        key={template.id}
                                        templateName={template.name}
                                        onClick={() => { }}
                                    />
                                ))
                            ) : (
                                <p>No has usado ninguna plantilla aún.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
