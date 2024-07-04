import React, { useState } from 'react';
import './Home.css';
import { capitalizeFirstLetter } from '../utils/helpers';
import TemplateWidget from '../utils/widgets/TemplateWidget';
import TemplateModal from './Modals/TemplateModal';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; filePath: string } | null>(null);
    const [templates] = useState<{ id: number; name: string; filePath: string }[]>([
        { id: 1, name: 'Plantilla Laboratorio', filePath: '/Plantilla_Laboraotorio/Plantilla-Laboratorio.pdf' },
        { id: 2, name: 'Plantilla Practicas-PreProfesionales', filePath: '/Plantilla_Practicas-PreProfesionales/INFORMES DE PRACTICAS PRE-PROFESIONALES.pdf' },
        { id: 3, name: 'Plantilla Investigacion', filePath: '/Plantilla_Investigacion/Plantilla-Investigacion.pdf' },
        { id: 4, name: 'Plantilla Ensayo', filePath: '/Plantilla_Ensayo/Plantilla Ensayo.pdf' }
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const userName = localStorage.getItem('userName') || '';
    const navigate = useNavigate();

    const openModal = (template: { id: number; name: string; filePath: string }) => {
        setSelectedTemplate(template);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTemplate(null);
    };

    const handleCreateReport = () => {
        if (selectedTemplate?.id === 1) {
            navigate('/create-report-lab');
        } else if (selectedTemplate?.id === 2) {
            navigate('/create-report-preprofessional');
        } else if (selectedTemplate?.id === 3) {
            navigate('/create-report-research');
        } else if (selectedTemplate?.id === 4) {
            navigate('/create-report-essay');
        }
        closeModal();
    };

    const filteredTemplates = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <div className="recommendations">
                    <h3>Nuestras Plantillas 🐧📄</h3>
                    <div className="search-section">
                        <i className="pi pi-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Buscar plantilla..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="templates">
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map((template) => (
                                <TemplateWidget
                                    key={template.id}
                                    templateName={template.name}
                                    onClick={() => openModal(template)}
                                />
                            ))
                        ) : (
                            <p className="no-templates-message">No se encontraron plantillas que coincidan con tu búsqueda.</p>
                        )}
                    </div>
                    <p className="new-templates-info">¡Pronto nuevas plantillas para ti ✅📄!</p>
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
