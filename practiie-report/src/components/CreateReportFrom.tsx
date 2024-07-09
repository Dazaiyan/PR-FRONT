import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Loader from '../utils/Loader';
import { createReport } from '../services/reportService';
import './CreateReport.css';

const CreateReportForm: React.FC = () => {
    const [formData, setFormData] = useState({
        report_name: '',
        school: '',
        date: '',
        course: '',
        subject: '',
        student: '',
        title: '',
        objective: '',
        materials: '',
        procedure: '',
        dataResults: '',
        analysis: '',
        conclusions: '',
        references: ''
    });
    const [errors, setErrors] = useState({
        report_name: '',
        school: '',
        date: '',
        course: '',
        subject: '',
        student: '',
        title: '',
        objective: '',
        materials: '',
        procedure: '',
        dataResults: '',
        analysis: '',
        conclusions: '',
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
                console.log("Form data being sent:", formData); // Añade un log para depuración
                await createReport(formData); // Usar el servicio
                navigate('/home'); // Redirect to home page after successful submission
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
                <h2>Crear Reporte</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="report_name">Nombre del Reporte</label>
                                    <InputText
                                        id="report_name"
                                        name="report_name"
                                        value={formData.report_name}
                                        onChange={handleChange}
                                        className={errors.report_name ? 'error-input' : ''}
                                    />
                                    {errors.report_name && <div className="error-message">{errors.report_name}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="school">Institución</label>
                                    <InputText
                                        id="school"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleChange}
                                        className={errors.school ? 'error-input' : ''}
                                    />
                                    {errors.school && <div className="error-message">{errors.school}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="date">Fecha</label>
                                    <InputText
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className={errors.date ? 'error-input' : ''}
                                    />
                                    {errors.date && <div className="error-message">{errors.date}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="course">Curso</label>
                                    <InputText
                                        id="course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className={errors.course ? 'error-input' : ''}
                                    />
                                    {errors.course && <div className="error-message">{errors.course}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="subject">Asignatura</label>
                                    <InputText
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'error-input' : ''}
                                    />
                                    {errors.subject && <div className="error-message">{errors.subject}</div>}
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
                                    <label htmlFor="student">Alumno</label>
                                    <InputText
                                        id="student"
                                        name="student"
                                        value={formData.student}
                                        onChange={handleChange}
                                        className={errors.student ? 'error-input' : ''}
                                    />
                                    {errors.student && <div className="error-message">{errors.student}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="title">Título</label>
                                    <InputText
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={errors.title ? 'error-input' : ''}
                                    />
                                    {errors.title && <div className="error-message">{errors.title}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="objective">Objetivo</label>
                                    <InputText
                                        id="objective"
                                        name="objective"
                                        value={formData.objective}
                                        onChange={handleChange}
                                        className={errors.objective ? 'error-input' : ''}
                                    />
                                    {errors.objective && <div className="error-message">{errors.objective}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="materials">Materiales</label>
                                    <InputText
                                        id="materials"
                                        name="materials"
                                        value={formData.materials}
                                        onChange={handleChange}
                                        className={errors.materials ? 'error-input' : ''}
                                    />
                                    {errors.materials && <div className="error-message">{errors.materials}</div>}
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
                                    <label htmlFor="procedure">Procedimiento</label>
                                    <InputTextarea
                                        id="procedure"
                                        name="procedure"
                                        value={formData.procedure}
                                        onChange={handleChange}
                                        className={errors.procedure ? 'error-input' : ''}
                                        onClick={() => openDialog('procedure')}
                                        autoResize={false}
                                    />
                                    {errors.procedure && <div className="error-message">{errors.procedure}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="dataResults">Cálculos</label>
                                    <InputTextarea
                                        id="dataResults"
                                        name="dataResults"
                                        value={formData.dataResults}
                                        onChange={handleChange}
                                        className={errors.dataResults ? 'error-input' : ''}
                                        onClick={() => openDialog('dataResults')}
                                        autoResize={false}
                                    />
                                    {errors.dataResults && <div className="error-message">{errors.dataResults}</div>}
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
                                    <label htmlFor="analysis">Análisis</label>
                                    <InputTextarea
                                        id="analysis"
                                        name="analysis"
                                        value={formData.analysis}
                                        onChange={handleChange}
                                        className={errors.analysis ? 'error-input' : ''}
                                        onClick={() => openDialog('analysis')}
                                        autoResize={false}
                                    />
                                    {errors.analysis && <div className="error-message">{errors.analysis}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="conclusions">Conclusiones</label>
                                    <InputTextarea
                                        id="conclusions"
                                        name="conclusions"
                                        value={formData.conclusions}
                                        onChange={handleChange}
                                        className={errors.conclusions ? 'error-input' : ''}
                                        onClick={() => openDialog('conclusions')}
                                        autoResize={false}
                                    />
                                    {errors.conclusions && <div className="error-message">{errors.conclusions}</div>}
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

export default CreateReportForm;
