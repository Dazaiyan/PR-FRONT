import React, { useState } from 'react';
import './Home.css';
import { capitalizeFirstLetter } from '../utils/helpers';
import TemplateWidget from '../utils/widgets/TemplateWidget';
import AddTemplateModal from '../components/AddTemplateModal';
import { Button } from 'primereact/button';

const MAX_TEMPLATES = 4; // Definir el límite máximo de plantillas

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addTemplateModalVisible, setAddTemplateModalVisible] = useState(false);
  const [templates, setTemplates] = useState<{ id: number; name: string; imageSrc: string }[]>([
    { id: 1, name: 'Plantilla 1', imageSrc: '/template-icon.png' },
    { id: 2, name: 'Plantilla 2', imageSrc: '/template-icon.png' },
  ]);

  const userName = localStorage.getItem('userName') || '';

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openAddTemplateModal = () => {
    setAddTemplateModalVisible(true);
  };

  const closeAddTemplateModal = () => {
    setAddTemplateModalVisible(false);
  };

  const handleAddTemplate = (template: { name: string; file: File }) => {
    if (templates.length < MAX_TEMPLATES) {
      const newTemplate = {
        id: templates.length + 1,
        name: template.name,
        imageSrc: URL.createObjectURL(template.file),
      };
      setTemplates([...templates, newTemplate]);
    } else {
      alert("Se ha alcanzado el número máximo de plantillas.");
    }
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
                onClick={openModal}
                onRemove={() => handleRemoveTemplate(template.id)}
              />
            ))}
          </div>
        </div>
        <Button className="add-template-button" onClick={openAddTemplateModal}>
          Agregar Plantilla
        </Button>
      </div>
      <AddTemplateModal
        visible={addTemplateModalVisible}
        onHide={closeAddTemplateModal}
        onAdd={handleAddTemplate}
      />
    </div>
  );
};

export default Home;




