import React, { useState } from 'react';
import './Home.css';
import { capitalizeFirstLetter } from '../utils/helpers';
import TemplateWidget from '../utils/widgets/TemplateWidget';
import TemplateModal from './TemplateModal';

const MAX_TEMPLATES = 4;

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; imageSrc: string } | null>(null);
  const [templates, setTemplates] = useState<{ id: number; name: string; imageSrc: string }[]>([
    { id: 1, name: 'Plantilla 1', imageSrc: '/template-icon.png' },
    { id: 2, name: 'Plantilla 2', imageSrc: '/template-icon.png' },
  ]);

  const userName = localStorage.getItem('userName') || '';

  const openModal = (template: { id: number; name: string; imageSrc: string }) => {
    setSelectedTemplate(template);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTemplate(null);
  };

  const handleRemoveTemplate = (id: number) => {
    const updatedTemplates = templates.filter(template => template.id !== id);
    setTemplates(updatedTemplates);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-welcome">
          <h1>Bienvenido a Pract<span>ii</span>eReport</h1>
        </div>
        <div className="profile">
          <img src="/profile-icon.png" alt="Profile Icon" className="profile-icon" />
          <span>{capitalizeFirstLetter(userName)}</span>
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
            {templates.map((template) => (
              <TemplateWidget
                key={template.id}
                imageSrc={template.imageSrc}
                onClick={() => openModal(template)}
                onRemove={() => handleRemoveTemplate(template.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <TemplateModal
        visible={modalVisible}
        onClose={closeModal}
        template={selectedTemplate}
      />
    </div>
  );
};

export default Home;
