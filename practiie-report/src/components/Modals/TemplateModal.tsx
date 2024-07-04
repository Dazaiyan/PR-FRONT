import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateModal.css';

interface TemplateModalProps {
    visible: boolean;
    onClose: () => void;
    template: { id: number; name: string; filePath: string } | null;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ visible, onClose, template }) => {
    const navigate = useNavigate();

    const handleCreateReport = () => {
        if (template) {
            switch (template.name) {
                case "Plantilla Laboratorio":
                    navigate('/create-report-lab');
                    break;
                case "Plantilla Investigacion":
                    navigate('/create-report-research');
                    break;
                case "Plantilla Ensayo":
                    navigate('/create-report-essay');
                    break;
                case "Plantilla Practicas-PreProfesionales":
                    navigate('/create-report-internship');
                    break;
                default:
                    navigate('/home');
            }
        }
    };

    if (!visible || !template) return null;

    const pdfUrls: { [key: string]: string } = {
        "Plantilla Laboratorio": '/Plantilla_Laboraotorio/Plantilla-Laboratorio.pdf',
        "Plantilla Investigacion": '/Plantilla_Investigacion/Plantilla-Investigacion.pdf',
        "Plantilla Ensayo": '/Plantilla_Ensayo/Plantilla Ensayo.pdf',
        "Plantilla Practicas-PreProfesionales": '/Plantilla_Practicas-PreProfesionales/INFORMES DE PRACTICAS PRE-PROFESIONALES.pdf'
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="left-section">
                    <div className="iframe-container">
                        <iframe
                            src={`${pdfUrls[template.name]}#toolbar=0`}
                            title="Vista previa del documento"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                </div>
                <div className="right-section">
                    <h2>{template.name}</h2>
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
