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
        report_name: '',
        student_name: '',
        student_year: '',
        internship_period: '',
        company_name: '',
        company_address: '',
        company_phone: '',
        company_fax: '',
        company_email: '',
        supervisor_name: '',
        supervisor_position: '',
        supervisor_profession: '',
        supervisor_phone: '',
        supervisor_fax: '',
        supervisor_email: '',
        company_description: '',
        company_location: '',
        company_access: '',
        company_resources: '',
        company_economic_activity: '',
        company_organizational_structure: '',
        useful_subjects: '',
        missing_topics: '',
        week_1: '',
        week_2: '',
        week_3: '',
        week_4: '',
        week_5: '',
        week_6: '',
        week_7: '',
        department_name: '',
        objectives: '',
        specific_functions: ''
    });

    const [errors, setErrors] = useState({
        report_name: '',
        student_name: '',
        student_year: '',
        internship_period: '',
        company_name: '',
        company_address: '',
        company_phone: '',
        company_fax: '',
        company_email: '',
        supervisor_name: '',
        supervisor_position: '',
        supervisor_profession: '',
        supervisor_phone: '',
        supervisor_fax: '',
        supervisor_email: '',
        company_description: '',
        company_location: '',
        company_access: '',
        company_resources: '',
        company_economic_activity: '',
        company_organizational_structure: '',
        useful_subjects: '',
        missing_topics: '',
        week_1: '',
        week_2: '',
        week_3: '',
        week_4: '',
        week_5: '',
        week_6: '',
        week_7: '',
        department_name: '',
        objectives: '',
        specific_functions: ''
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
                const response = await fetch('http://localhost:3000/internship/create', {
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
                                    <label htmlFor="student_name">Nombre del Estudiante</label>
                                    <InputText
                                        id="student_name"
                                        name="student_name"
                                        value={formData.student_name}
                                        onChange={handleChange}
                                        className={errors.student_name ? 'error-input' : ''}
                                    />
                                    {errors.student_name && <div className="error-message">{errors.student_name}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="student_year">Año del Estudiante</label>
                                    <InputText
                                        id="student_year"
                                        name="student_year"
                                        value={formData.student_year}
                                        onChange={handleChange}
                                        className={errors.student_year ? 'error-input' : ''}
                                    />
                                    {errors.student_year && <div className="error-message">{errors.student_year}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="internship_period">Período de Prácticas</label>
                                    <InputText
                                        id="internship_period"
                                        name="internship_period"
                                        value={formData.internship_period}
                                        onChange={handleChange}
                                        className={errors.internship_period ? 'error-input' : ''}
                                    />
                                    {errors.internship_period && <div className="error-message">{errors.internship_period}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="company_name">Nombre de la Empresa</label>
                                    <InputText
                                        id="company_name"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        className={errors.company_name ? 'error-input' : ''}
                                    />
                                    {errors.company_name && <div className="error-message">{errors.company_name}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="company_address">Dirección de la Empresa</label>
                                    <InputText
                                        id="company_address"
                                        name="company_address"
                                        value={formData.company_address}
                                        onChange={handleChange}
                                        className={errors.company_address ? 'error-input' : ''}
                                    />
                                    {errors.company_address && <div className="error-message">{errors.company_address}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="company_phone">Teléfono de la Empresa</label>
                                    <InputText
                                        id="company_phone"
                                        name="company_phone"
                                        value={formData.company_phone}
                                        onChange={handleChange}
                                        className={errors.company_phone ? 'error-input' : ''}
                                    />
                                    {errors.company_phone && <div className="error-message">{errors.company_phone}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="company_fax">Fax de la Empresa</label>
                                    <InputText
                                        id="company_fax"
                                        name="company_fax"
                                        value={formData.company_fax}
                                        onChange={handleChange}
                                        className={errors.company_fax ? 'error-input' : ''}
                                    />
                                    {errors.company_fax && <div className="error-message">{errors.company_fax}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="company_email">Correo Electrónico de la Empresa</label>
                                    <InputText
                                        id="company_email"
                                        name="company_email"
                                        value={formData.company_email}
                                        onChange={handleChange}
                                        className={errors.company_email ? 'error-input' : ''}
                                    />
                                    {errors.company_email && <div className="error-message">{errors.company_email}</div>}
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
                                    <label htmlFor="supervisor_name">Nombre del Supervisor</label>
                                    <InputText
                                        id="supervisor_name"
                                        name="supervisor_name"
                                        value={formData.supervisor_name}
                                        onChange={handleChange}
                                        className={errors.supervisor_name ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_name && <div className="error-message">{errors.supervisor_name}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="supervisor_position">Cargo del Supervisor</label>
                                    <InputText
                                        id="supervisor_position"
                                        name="supervisor_position"
                                        value={formData.supervisor_position}
                                        onChange={handleChange}
                                        className={errors.supervisor_position ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_position && <div className="error-message">{errors.supervisor_position}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="supervisor_profession">Profesión del Supervisor</label>
                                    <InputText
                                        id="supervisor_profession"
                                        name="supervisor_profession"
                                        value={formData.supervisor_profession}
                                        onChange={handleChange}
                                        className={errors.supervisor_profession ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_profession && <div className="error-message">{errors.supervisor_profession}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="supervisor_phone">Teléfono del Supervisor</label>
                                    <InputText
                                        id="supervisor_phone"
                                        name="supervisor_phone"
                                        value={formData.supervisor_phone}
                                        onChange={handleChange}
                                        className={errors.supervisor_phone ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_phone && <div className="error-message">{errors.supervisor_phone}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="supervisor_fax">Fax del Supervisor</label>
                                    <InputText
                                        id="supervisor_fax"
                                        name="supervisor_fax"
                                        value={formData.supervisor_fax}
                                        onChange={handleChange}
                                        className={errors.supervisor_fax ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_fax && <div className="error-message">{errors.supervisor_fax}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="supervisor_email">Correo Electrónico del Supervisor</label>
                                    <InputText
                                        id="supervisor_email"
                                        name="supervisor_email"
                                        value={formData.supervisor_email}
                                        onChange={handleChange}
                                        className={errors.supervisor_email ? 'error-input' : ''}
                                    />
                                    {errors.supervisor_email && <div className="error-message">{errors.supervisor_email}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="company_description">Descripción de la Empresa</label>
                                    <InputText
                                        id="company_description"
                                        name="company_description"
                                        value={formData.company_description}
                                        onChange={handleChange}
                                        className={errors.company_description ? 'error-input' : ''}
                                    />
                                    {errors.company_description && <div className="error-message">{errors.company_description}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="company_location">Ubicación de la Empresa</label>
                                    <InputText
                                        id="company_location"
                                        name="company_location"
                                        value={formData.company_location}
                                        onChange={handleChange}
                                        className={errors.company_location ? 'error-input' : ''}
                                    />
                                    {errors.company_location && <div className="error-message">{errors.company_location}</div>}
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
                                    <label htmlFor="company_access">Acceso a la Empresa</label>
                                    <InputTextarea
                                        id="company_access"
                                        name="company_access"
                                        value={formData.company_access}
                                        onChange={handleChange}
                                        className={errors.company_access ? 'error-input' : ''}
                                        onClick={() => openDialog('company_access')}
                                        autoResize={false}
                                    />
                                    {errors.company_access && <div className="error-message">{errors.company_access}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="company_resources">Recursos de la Empresa</label>
                                    <InputTextarea
                                        id="company_resources"
                                        name="company_resources"
                                        value={formData.company_resources}
                                        onChange={handleChange}
                                        className={errors.company_resources ? 'error-input' : ''}
                                        onClick={() => openDialog('company_resources')}
                                        autoResize={false}
                                    />
                                    {errors.company_resources && <div className="error-message">{errors.company_resources}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="company_economic_activity">Actividad Económica de la Empresa</label>
                                    <InputTextarea
                                        id="company_economic_activity"
                                        name="company_economic_activity"
                                        value={formData.company_economic_activity}
                                        onChange={handleChange}
                                        className={errors.company_economic_activity ? 'error-input' : ''}
                                        onClick={() => openDialog('company_economic_activity')}
                                        autoResize={false}
                                    />
                                    {errors.company_economic_activity && <div className="error-message">{errors.company_economic_activity}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="company_organizational_structure">Estructura Organizacional de la Empresa</label>
                                    <InputTextarea
                                        id="company_organizational_structure"
                                        name="company_organizational_structure"
                                        value={formData.company_organizational_structure}
                                        onChange={handleChange}
                                        className={errors.company_organizational_structure ? 'error-input' : ''}
                                        onClick={() => openDialog('company_organizational_structure')}
                                        autoResize={false}
                                    />
                                    {errors.company_organizational_structure && <div className="error-message">{errors.company_organizational_structure}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="useful_subjects">Asignaturas Útiles</label>
                                    <InputTextarea
                                        id="useful_subjects"
                                        name="useful_subjects"
                                        value={formData.useful_subjects}
                                        onChange={handleChange}
                                        className={errors.useful_subjects ? 'error-input' : ''}
                                        onClick={() => openDialog('useful_subjects')}
                                        autoResize={false}
                                    />
                                    {errors.useful_subjects && <div className="error-message">{errors.useful_subjects}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="missing_topics">Temas Faltantes</label>
                                    <InputTextarea
                                        id="missing_topics"
                                        name="missing_topics"
                                        value={formData.missing_topics}
                                        onChange={handleChange}
                                        className={errors.missing_topics ? 'error-input' : ''}
                                        onClick={() => openDialog('missing_topics')}
                                        autoResize={false}
                                    />
                                    {errors.missing_topics && <div className="error-message">{errors.missing_topics}</div>}
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
                                    <label htmlFor="week_1">Semana 1</label>
                                    <InputTextarea
                                        id="week_1"
                                        name="week_1"
                                        value={formData.week_1}
                                        onChange={handleChange}
                                        className={errors.week_1 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_1')}
                                        autoResize={false}
                                    />
                                    {errors.week_1 && <div className="error-message">{errors.week_1}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_2">Semana 2</label>
                                    <InputTextarea
                                        id="week_2"
                                        name="week_2"
                                        value={formData.week_2}
                                        onChange={handleChange}
                                        className={errors.week_2 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_2')}
                                        autoResize={false}
                                    />
                                    {errors.week_2 && <div className="error-message">{errors.week_2}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_3">Semana 3</label>
                                    <InputTextarea
                                        id="week_3"
                                        name="week_3"
                                        value={formData.week_3}
                                        onChange={handleChange}
                                        className={errors.week_3 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_3')}
                                        autoResize={false}
                                    />
                                    {errors.week_3 && <div className="error-message">{errors.week_3}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_4">Semana 4</label>
                                    <InputTextarea
                                        id="week_4"
                                        name="week_4"
                                        value={formData.week_4}
                                        onChange={handleChange}
                                        className={errors.week_4 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_4')}
                                        autoResize={false}
                                    />
                                    {errors.week_4 && <div className="error-message">{errors.week_4}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_5">Semana 5</label>
                                    <InputTextarea
                                        id="week_5"
                                        name="week_5"
                                        value={formData.week_5}
                                        onChange={handleChange}
                                        className={errors.week_5 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_5')}
                                        autoResize={false}
                                    />
                                    {errors.week_5 && <div className="error-message">{errors.week_5}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_6">Semana 6</label>
                                    <InputTextarea
                                        id="week_6"
                                        name="week_6"
                                        value={formData.week_6}
                                        onChange={handleChange}
                                        className={errors.week_6 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_6')}
                                        autoResize={false}
                                    />
                                    {errors.week_6 && <div className="error-message">{errors.week_6}</div>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="week_7">Semana 7</label>
                                    <InputTextarea
                                        id="week_7"
                                        name="week_7"
                                        value={formData.week_7}
                                        onChange={handleChange}
                                        className={errors.week_7 ? 'error-input' : ''}
                                        onClick={() => openDialog('week_7')}
                                        autoResize={false}
                                    />
                                    {errors.week_7 && <div className="error-message">{errors.week_7}</div>}
                                </div>
                            </div>
                            <div className="button-container">
                                <Button onClick={prevStep} className="nav-button">Anterior</Button>
                                <Button onClick={nextStep} className="nav-button">Siguiente</Button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="department_name">Nombre del Departamento</label>
                                    <InputText
                                        id="department_name"
                                        name="department_name"
                                        value={formData.department_name}
                                        onChange={handleChange}
                                        className={errors.department_name ? 'error-input' : ''}
                                    />
                                    {errors.department_name && <div className="error-message">{errors.department_name}</div>}
                                </div>
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
                                <div className="p-field">
                                    <label htmlFor="specific_functions">Funciones Específicas</label>
                                    <InputTextarea
                                        id="specific_functions"
                                        name="specific_functions"
                                        value={formData.specific_functions}
                                        onChange={handleChange}
                                        className={errors.specific_functions ? 'error-input' : ''}
                                        onClick={() => openDialog('specific_functions')}
                                        autoResize={false}
                                    />
                                    {errors.specific_functions && <div className="error-message">{errors.specific_functions}</div>}
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
