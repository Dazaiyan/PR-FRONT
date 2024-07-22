import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import { Button } from 'primereact/button';
import axios from 'axios';

const Settings: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('tu-informacion');
    const [reportLabs, setReportLabs] = useState<any[]>([]);
    const [internshipReports, setInternshipReports] = useState<any[]>([]);
    const [essayReports, setEssayReports] = useState<any[]>([]);
    const [researchReports, setResearchReports] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedOption === 'tus-plantillas') {
            fetchTemplates();
        }
    }, [selectedOption]);

    const fetchTemplates = async () => {
        try {
            const reportLabResponse = await axios.get('http://localhost:3000/reports/all');
            console.log('Report Labs:', reportLabResponse.data);
            setReportLabs(reportLabResponse.data);

            const internshipReportResponse = await axios.get('http://localhost:3000/internship/all');
            console.log('Internship Reports:', internshipReportResponse.data);
            setInternshipReports(internshipReportResponse.data);

            const essayReportResponse = await axios.get('http://localhost:3000/essay/all');
            console.log('Essay Reports:', essayReportResponse.data);
            setEssayReports(essayReportResponse.data);

            const researchReportResponse = await axios.get('http://localhost:3000/research/all');
            console.log('Research Reports:', researchReportResponse.data);
            setResearchReports(researchReportResponse.data);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

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

    const downloadPDF = (reportId: number, reportType: string) => {
        window.open(`http://localhost:3000/reports/download/${reportType}/${reportId}`, '_blank');
    };
    
    const renderTemplateSection = (templates: any[], title: string, type: string) => (
        <div>
            <h3>{title}</h3>
            <div className="templates-list">
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <div key={template.id} className="template-card">
                            <h3>{template.report_name || template.title || template.researchTitle}</h3>
                            <Button label="Descargar PDF" onClick={() => downloadPDF(template.id, type)} />
                        </div>
                    ))
                ) : (
                    <p>No has usado ninguna plantilla aún.</p>
                )}
            </div>
        </div>
    );

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
                    <button onClick={handleLogout} className="settings-button">Cerrar Sesion</button>
                    <button onClick={handleGoHome} className="settings-button">Volver</button>
                </div>
            </div>
            <div className="settings-content">
                {selectedOption === 'tu-informacion' && (
                    <div>
                        <h2>Tu Información</h2>
                        <p>Aquí puedes ver y editar tu información personal.</p>
                    </div>
                )}
                {selectedOption === 'tus-plantillas' && (
                    <div>
                        <h2>Tus Plantillas</h2>
                        {renderTemplateSection(reportLabs, 'Reportes de Laboratorio', 'ReportLab')}
                        {renderTemplateSection(internshipReports, 'Reportes de Prácticas Preprofesionales', 'InternshipReport')}
                        {renderTemplateSection(essayReports, 'Reportes de Ensayo', 'EssayReport')}
                        {renderTemplateSection(researchReports, 'Reportes de Investigación', 'ResearchReport')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
