import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Loader from '../utils/Loader';
import './CreateReport.css';

const CreateResearchReportForm: React.FC = () => {
    const [formData, setFormData] = useState({
        researchTitle: '',
        researchDate: '',
        researcher: '',
        advisor: '',
        abstract: '',
        introduction: '',
        methodology: '',
        results: '',
        discussion: '',
        conclusion: '',
        references: ''
    });
    const [errors, setErrors] = useState({
        researchTitle: '',
        researchDate: '',
        researcher: '',
        advisor: '',
        abstract: '',
        introduction: '',
        methodology: '',
        results: '',
        discussion: '',
        conclusion: '',
        references: ''
    });
    const [visible, setVisible] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors: any = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = `El campo ${key} es obligatorio.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/report/create-research', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'reporte-investigacion.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    navigate('/home'); // Redirect to home page after successful submission
                } else {
                    console.error('Error generating PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const openDialog = (field: string) => {
        setActiveField(field);
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
        setActiveField(null);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="create-report-container">
            <div className="create-report-content">
                <div className="header">
                    <button className="close-button" onClick={handleGoHome}>X</button>
                </div>
                <h2>Crear Reporte de Investigación</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="researchTitle">Título de Investigación</label>
                                    <InputText
                                        id="researchTitle"
                                        name="researchTitle"
                                        value={formData.researchTitle}
                                        onChange={handleChange}
                                        className={errors.researchTitle ? 'error-input' : ''}
                                    />
                                    {errors.researchTitle && <div className="error-message">{errors.researchTitle}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="researchDate">Fecha de Investigación</label>
                                    <InputText
                                        id="researchDate"
                                        name="researchDate"
                                        value={formData.researchDate}
                                        onChange={handleChange}
                                        className={errors.researchDate ? 'error-input' : ''}
                                    />
                                    {errors.researchDate && <div className="error-message">{errors.researchDate}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="researcher">Investigador</label>
                                    <InputText
                                        id="researcher"
                                        name="researcher"
                                        value={formData.researcher}
                                        onChange={handleChange}
                                        className={errors.researcher ? 'error-input' : ''}
                                    />
                                    {errors.researcher && <div className="error-message">{errors.researcher}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="advisor">Asesor</label>
                                    <InputText
                                        id="advisor"
                                        name="advisor"
                                        value={formData.advisor}
                                        onChange={handleChange}
                                        className={errors.advisor ? 'error-input' : ''}
                                    />
                                    {errors.advisor && <div className="error-message">{errors.advisor}</div>}
                                </div>
                            </div>
                            <div className="button-container centered">
                                <Button onClick={nextStep} className="nav-button">Siguiente</Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="abstract">Resumen</label>
                                    <InputTextarea
                                        id="abstract"
                                        name="abstract"
                                        value={formData.abstract}
                                        onChange={handleChange}
                                        className={errors.abstract ? 'error-input' : ''}
                                        onClick={() => openDialog('abstract')}
                                        autoResize={false}
                                    />
                                    {errors.abstract && <div className="error-message">{errors.abstract}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="introduction">Introducción</label>
                                    <InputTextarea
                                        id="introduction"
                                        name="introduction"
                                        value={formData.introduction}
                                        onChange={handleChange}
                                        className={errors.introduction ? 'error-input' : ''}
                                        onClick={() => openDialog('introduction')}
                                        autoResize={false}
                                    />
                                    {errors.introduction && <div className="error-message">{errors.introduction}</div>}
                                </div>
                            </div>
                            <div className="button-container">
                                <Button onClick={prevStep} className="nav-button">Anterior</Button>
                                <Button onClick={nextStep} className="nav-button">Siguiente</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="methodology">Metodología</label>
                                    <InputTextarea
                                        id="methodology"
                                        name="methodology"
                                        value={formData.methodology}
                                        onChange={handleChange}
                                        className={errors.methodology ? 'error-input' : ''}
                                        onClick={() => openDialog('methodology')}
                                        autoResize={false}
                                    />
                                    {errors.methodology && <div className="error-message">{errors.methodology}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="results">Resultados</label>
                                    <InputTextarea
                                        id="results"
                                        name="results"
                                        value={formData.results}
                                        onChange={handleChange}
                                        className={errors.results ? 'error-input' : ''}
                                        onClick={() => openDialog('results')}
                                        autoResize={false}
                                    />
                                    {errors.results && <div className="error-message">{errors.results}</div>}
                                </div>
                            </div>
                            <div className="button-container">
                                <Button onClick={prevStep} className="nav-button">Anterior</Button>
                                <Button onClick={nextStep} className="nav-button">Siguiente</Button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="discussion">Discusión</label>
                                    <InputTextarea
                                        id="discussion"
                                        name="discussion"
                                        value={formData.discussion}
                                        onChange={handleChange}
                                        className={errors.discussion ? 'error-input' : ''}
                                        onClick={() => openDialog('discussion')}
                                        autoResize={false}
                                    />
                                    {errors.discussion && <div className="error-message">{errors.discussion}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="conclusion">Conclusión</label>
                                    <InputTextarea
                                        id="conclusion"
                                        name="conclusion"
                                        value={formData.conclusion}
                                        onChange={handleChange}
                                        className={errors.conclusion ? 'error-input' : ''}
                                        onClick={() => openDialog('conclusion')}
                                        autoResize={false}
                                    />
                                    {errors.conclusion && <div className="error-message">{errors.conclusion}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="references">Referencias</label>
                                    <InputTextarea
                                        id="references"
                                        name="references"
                                        value={formData.references}
                                        onChange={handleChange}
                                        className={errors.references ? 'error-input' : ''}
                                        onClick={() => openDialog('references')}
                                        autoResize={false}
                                    />
                                    {errors.references && <div className="error-message">{errors.references}</div>}
                                </div>
                            </div>
                            <div className="button-container">
                                <Button onClick={prevStep} className="nav-button">Anterior</Button>
                                <Button type="submit" disabled={loading} className="submit-button">
                                    {loading ? <Loader /> : 'Crear Reporte'}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <Dialog header="Detalles" visible={visible} style={{ width: '50vw' }} onHide={closeDialog}>
                <InputTextarea
                    id={activeField || ''}
                    name={activeField || ''}
                    value={activeField ? formData[activeField as keyof typeof formData] : ''}
                    onChange={handleChange}
                    rows={10}
                    cols={50}
                    style={{ width: '100%' }}
                />
            </Dialog>
        </div>
    );
};

export default CreateResearchReportForm;
