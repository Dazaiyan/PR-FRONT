import React from 'react';
import './TemplateModal.css';
import DocumentPreview from './DocumentPreview';

interface TemplateModalProps {
  visible: boolean;
  onClose: () => void;
  template: { id: number; name: string; filePath: string } | null;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ visible, onClose, template }) => {
  if (!visible || !template) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="left-section">
          <DocumentPreview filePath={template.filePath} />
        </div>
        <div className="right-section">
          <h2>Plantilla Practicas Pre-Profesionales</h2>
          <div className="button-container">
            <button className="create-report-button">Crear Reporte</button>
            <button className="close-modal-button" onClick={onClose}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
