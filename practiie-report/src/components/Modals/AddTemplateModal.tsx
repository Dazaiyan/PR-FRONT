import React, { useState } from 'react';
import './AddTemplateModal.css';

interface AddTemplateModalProps {
  visible: boolean;
  onHide: () => void;
  onAdd: (template: { name: string; file: File }) => void;
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({ visible, onHide, onAdd }) => {
  const [templateName, setTemplateName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Define el número total de páginas, ajusta esto según sea necesario

  const handleAdd = () => {
    if (templateName && selectedFile) {
      onAdd({ name: templateName, file: selectedFile });
      setTemplateName('');
      setSelectedFile(null);
      onHide();
    } else {
      alert('Por favor, ingresa un nombre y selecciona un archivo.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onHide}>X</button>
        <h2>Agregar Nueva Plantilla</h2>
        <input
          type="text"
          placeholder="Nombre de la Plantilla"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <button className="add-button" onClick={handleAdd}>Agregar</button>
        <div className="document-preview">
          <iframe
            src={`/Plantilla_Laboraotorio/informe.html`}
            width="100%"
            height="600px"
            title="Vista previa del documento"
            style={{ border: 'none' }}
          ></iframe>
          <div className="document-preview-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplateModal;
