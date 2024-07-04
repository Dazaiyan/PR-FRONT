import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Loader from '../utils/Loader';
import './CreateReport.css';

const CreateInternshipReportForm: React.FC = () => {
    const [formData, setFormData] = useState({
        institutionName: '',
        internshipPeriod: '',
        location: '',
        department: '',
        studentName: '',
        semester: '',
        internshipTutor: '',
        activityDescription: '',
        objectives: '',
        conclusions: '',
        reflections: '',
    });
    const [errors, setErrors] = useState({
        institutionName: '',
        internshipPeriod: '',
        location: '',
        department: '',
        studentName: '',
        semester: '',
        internshipTutor: '',
        activityDescription: '',
        objectives: '',
        conclusions: '',
        reflections: '',
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
                const response = await fetch('http://localhost:3000/report/create-internship', {
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
                    a.download = 'reporte-practicas-preprofesionales.pdf';
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
                <h2>Crear Reporte de Prácticas Pre-Profesionales</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="institutionName">Nombre de la Institución</label>
                                    <InputText
                                        id="institutionName"
                                        name="institutionName"
                                        value={formData.institutionName}
                                        onChange={handleChange}
                                        className={errors.institutionName ? 'error-input' : ''}
                                    />
                                    {errors.institutionName && <div className="error-message">{errors.institutionName}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="internshipPeriod">Período de Prácticas</label>
                                    <InputText
                                        id="internshipPeriod"
                                        name="internshipPeriod"
                                        value={formData.internshipPeriod}
                                        onChange={handleChange}
                                        className={errors.internshipPeriod ? 'error-input' : ''}
                                    />
                                    {errors.internshipPeriod && <div className="error-message">{errors.internshipPeriod}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="location">Ubicación</label>
                                    <InputText
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={errors.location ? 'error-input' : ''}
                                    />
                                    {errors.location && <div className="error-message">{errors.location}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="department">Departamento</label>
                                    <InputText
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={errors.department ? 'error-input' : ''}
                                    />
                                    {errors.department && <div className="error-message">{errors.department}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="studentName">Nombre del Estudiante</label>
                                    <InputText
                                        id="studentName"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        className={errors.studentName ? 'error-input' : ''}
                                    />
                                    {errors.studentName && <div className="error-message">{errors.studentName}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="semester">Semestre</label>
                                    <InputText
                                        id="semester"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        className={errors.semester ? 'error-input' : ''}
                                    />
                                    {errors.semester && <div className="error-message">{errors.semester}</div>}
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
                                    <label htmlFor="internshipTutor">Tutor de Prácticas</label>
                                    <InputText
                                        id="internshipTutor"
                                        name="internshipTutor"
                                        value={formData.internshipTutor}
                                        onChange={handleChange}
                                        className={errors.internshipTutor ? 'error-input' : ''}
                                    />
                                    {errors.internshipTutor && <div className="error-message">{errors.internshipTutor}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="activityDescription">Descripción de la Actividad</label>
                                    <InputTextarea
                                        id="activityDescription"
                                        name="activityDescription"
                                        value={formData.activityDescription}
                                        onChange={handleChange}
                                        className={errors.activityDescription ? 'error-input' : ''}
                                        onClick={() => openDialog('activityDescription')}
                                        autoResize={false}
                                    />
                                    {errors.activityDescription && <div className="error-message">{errors.activityDescription}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="objectives">Objetivos</label>
                                    <InputTextarea
                                        id="objectives"
                                        name="objectives"
                                        value={formData.objectives}
                                        onChange={handleChange}
                                        className={errors.objectives ? 'error-input' : ''}
                                        onClick={() => openDialog('objectives')}
                                        autoResize={false}
                                    />
                                    {errors.objectives && <div className="error-message">{errors.objectives}</div>}
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
                                    <label htmlFor="reflections">Reflexiones</label>
                                    <InputTextarea
                                        id="reflections"
                                        name="reflections"
                                        value={formData.reflections}
                                        onChange={handleChange}
                                        className={errors.reflections ? 'error-input' : ''}
                                        onClick={() => openDialog('reflections')}
                                        autoResize={false}
                                    />
                                    {errors.reflections && <div className="error-message">{errors.reflections}</div>}
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

export default CreateInternshipReportForm;
