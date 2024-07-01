import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateModal.css';

interface TemplateModalProps {
    visible: boolean;
    onClose: () => void;
    template: { id: number; name: string; filePath: string } | null;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ visible, onClose, template }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Ajusta esto según el número total de páginas HTML que tengas

    const handleCreateReport = () => {
        navigate('/create-report');
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

    if (!visible || !template) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="left-section">
                    <div className="iframe-container">
                        <iframe
                            src={`/Plantilla_Laboraotorio/informe-${currentPage}.html`}
                            title="Vista previa del documento"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                </div>
                <div className="right-section">
                    <h2>Plantilla Laboratorios</h2>
                    <div className="button-container">
                        <button className="create-report-button" onClick={handleCreateReport}>Crear Reporte</button>
                        <button className="close-modal-button" onClick={onClose}>X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateModal;
