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
            fetchAllTemplates();
        }
    }, [selectedOption]);

    const fetchAllTemplates = async () => {
        try {
            const [reportLabsRes, internshipReportsRes, essayReportsRes, researchReportsRes] = await Promise.all([
                axios.get('http://localhost:3000/reportLabs/all'),
                axios.get('http://localhost:3000/internships/all'),
                axios.get('http://localhost:3000/essays/all'),
                axios.get('http://localhost:3000/research/all')
            ]);

            setReportLabs(reportLabsRes.data);
            setInternshipReports(internshipReportsRes.data);
            setEssayReports(essayReportsRes.data);
            setResearchReports(researchReportsRes.data);
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

    const downloadPDF = (reportName: string, reportType: string) => {
        window.open(`http://localhost:3000/reports/download/${reportType}/${reportName}`, '_blank');
    };

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
                    <button onClick={handleLogout} className="settings-button">Log Out</button>
                    <button onClick={handleGoHome} className="settings-button">Volver</button>
                </div>
            </div>
            <div className="settings-content">
                {selectedOption === 'tu-informacion' && (
                    <div>
                        <h2>Tu Información</h2>
                        <p>Aquí puedes ver y editar tu información personal.</p>
                        {/* Contenido adicional para "Tu Información" */}
                    </div>
                )}
                {selectedOption === 'tus-plantillas' && (
                    <div>
                        <h2>Tus Plantillas</h2>
                        <div>
                            <h3>Reportes de Laboratorio</h3>
                            <div className="templates-list">
                                {reportLabs.length > 0 ? (
                                    reportLabs.map((template) => (
                                        <div key={template.id} className="template-card animate">
                                            <h4>{template.report_name}</h4>
                                            <Button label="Descargar PDF" onClick={() => downloadPDF(template.report_name, 'ReportLab')} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No has usado ninguna plantilla de laboratorio aún.</p>
                                )}
                            </div>
                            <h3>Reportes de Practicas Preprofesionales</h3>
                            <div className="templates-list">
                                {internshipReports.length > 0 ? (
                                    internshipReports.map((template) => (
                                        <div key={template.id} className="template-card animate">
                                            <h4>{template.report_name}</h4>
                                            <Button label="Descargar PDF" onClick={() => downloadPDF(template.report_name, 'InternshipReport')} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No has usado ninguna plantilla de prácticas preprofesionales aún.</p>
                                )}
                            </div>
                            <h3>Reportes de Ensayo</h3>
                            <div className="templates-list">
                                {essayReports.length > 0 ? (
                                    essayReports.map((template) => (
                                        <div key={template.id} className="template-card animate">
                                            <h4>{template.title}</h4>
                                            <Button label="Descargar PDF" onClick={() => downloadPDF(template.title, 'EssayReport')} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No has usado ninguna plantilla de ensayo aún.</p>
                                )}
                            </div>
                            <h3>Reportes de Investigación</h3>
                            <div className="templates-list">
                                {researchReports.length > 0 ? (
                                    researchReports.map((template) => (
                                        <div key={template.id} className="template-card animate">
                                            <h4>{template.researchTitle}</h4>
                                            <Button label="Descargar PDF" onClick={() => downloadPDF(template.researchTitle, 'ResearchReport')} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No has usado ninguna plantilla de investigación aún.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
