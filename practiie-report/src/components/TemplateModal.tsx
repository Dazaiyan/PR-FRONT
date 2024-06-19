import React from 'react';
import './TemplateModal.css';
import DocumentPreview from './DocumentPreview';

interface TemplateModalProps {
  visible: boolean;
  onClose: () => void;
  template: { id: number; name: string; imageSrc: string } | null;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ visible, onClose, template }) => {
  if (!visible || !template) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>x</button>
        <h2>{template.name}</h2>
        <div className="document-container">
          <DocumentPreview filePath="/INFORMES DE PRACTICAS PRE-PROFESIONALES.docx" />
        </div>
        <button className="create-report-button">Crear Reporte</button>
      </div>
    </div>
  );
};

export default TemplateModal;
