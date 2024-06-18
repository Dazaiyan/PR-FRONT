import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';
import TemplateWidget from '../utils/widgets/TemplateWidget';
import AddTemplateModal from '../components/AddTemplateModal';
import DocumentViewer from '../components/DocumentViewer';
import { Button } from 'primereact/button';

const HomeView: React.FC = () => {
  const [templates, setTemplates] = useState<{ id: number; name: string; file: File }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addTemplateModalVisible, setAddTemplateModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; file: File } | null>(null);

  const userName = localStorage.getItem('userName') || 'Usuario';

  const openModal = (template: { id: number; name: string; file: File }) => {
    setSelectedTemplate(template);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTemplate(null);
  };

  const openAddTemplateModal = () => {
    setAddTemplateModalVisible(true);
  };

  const closeAddTemplateModal = () => {
    setAddTemplateModalVisible(false);
  };

  const handleAddTemplate = (template: { name: string; file: File }) => {
    const newTemplate = {
      id: templates.length + 1,
      name: template.name,
      file: template.file,
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleRemoveTemplate = (id: number) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
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
                imageSrc="/template-icon.png"
                onClick={() => openModal(template)}
                onRemove={() => handleRemoveTemplate(template.id)}
              />
            ))}
          </div>
        </div>
        <Button label="Agregar Plantilla" onClick={openAddTemplateModal} />
      </div>
      <AddTemplateModal
        visible={addTemplateModalVisible}
        onHide={closeAddTemplateModal}
        onAdd={handleAddTemplate}
      />
      {selectedTemplate && (
        <DocumentViewer
          template={selectedTemplate}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomeView;



