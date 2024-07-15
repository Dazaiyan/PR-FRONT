import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar'; // Importar el Calendar para el datepicker
import Loader from '../utils/Loader';
import './CreateReport.css';

const CreateEssayReportForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        course: '',
        instructor: '',
        dueDate: null as Date | null, // Inicializar como null o Date
        abstract: '',
        introduction: '',
        body: '',
        conclusion: '',
        references: ''
    });
    
    

    const [errors, setErrors] = useState({
        title: '',
        author: '',
        course: '',
        instructor: '',
        dueDate: '',
        abstract: '',
        introduction: '',
        body: '',
        conclusion: '',
        references: ''
    });

    const [activePage, setActivePage] = useState(0); // Estado para la página activa
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (e: { value: Date | Date[] }) => {
        setFormData({
            ...formData,
            dueDate: e.value instanceof Date ? e.value : e.value[0] // Manejar Date o Date[]
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

    const handleNext = () => {
        if (validateForm()) {
            setActivePage(activePage + 1);
        }
    };

    const handlePrevious = () => {
        setActivePage(activePage - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/essay/create', {
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
                    a.download = `${formData.title}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    navigate('/home'); // Redirigir a la página de inicio después de la presentación exitosa
                } else {
                    console.error('Error generando PDF:', response.statusText);
                }
            } catch (error) {
                console.error('Error enviando formulario:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const renderFormPage = () => {
        switch (activePage) {
            case 0:
                return (
                    <div className="form-page">
                        <div className="form-row">
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
                            <div className="p-field">
                                <label htmlFor="author">Autor</label>
                                <InputText
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className={errors.author ? 'error-input' : ''}
                                />
                                {errors.author && <div className="error-message">{errors.author}</div>}
                            </div>
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
                        </div>
                        <div className="form-row">
                            <div className="p-field">
                                <label htmlFor="instructor">Instructor</label>
                                <InputText
                                    id="instructor"
                                    name="instructor"
                                    value={formData.instructor}
                                    onChange={handleChange}
                                    className={errors.instructor ? 'error-input' : ''}
                                />
                                {errors.instructor && <div className="error-message">{errors.instructor}</div>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="dueDate">Fecha de Entrega</label>
                                <Calendar
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    className={errors.dueDate ? 'error-input' : ''}
                                    dateFormat="dd/mm/yy"
                                    showIcon
                                />
                                {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
                            </div>
                        </div>
                        <div className="button-container centered">
                            <Button label="Siguiente" onClick={handleNext} />
                        </div>
                    </div>
                );
            case 1:
                return (
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
                                    autoResize={false}
                                />
                                {errors.abstract && <div className="error-message">{errors.abstract}</div>}
                            </div>
                        </div>
                        <div className="button-container">
                            <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                            <Button label="Siguiente" onClick={handleNext} />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-page">
                        <div className="form-row">
                            <div className="p-field">
                                <label htmlFor="introduction">Introducción</label>
                                <InputTextarea
                                    id="introduction"
                                    name="introduction"
                                    value={formData.introduction}
                                    onChange={handleChange}
                                    className={errors.introduction ? 'error-input' : ''}
                                    autoResize={false}
                                />
                                {errors.introduction && <div className="error-message">{errors.introduction}</div>}
                            </div>
                        </div>
                        <div className="button-container">
                            <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                            <Button label="Siguiente" onClick={handleNext} />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-page">
                        <div className="form-row">
                            <div className="p-field">
                                <label htmlFor="body">Desarrollo</label>
                                <InputTextarea
                                    id="body"
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    className={errors.body ? 'error-input' : ''}
                                    autoResize={false}
                                />
                                {errors.body && <div className="error-message">{errors.body}</div>}
                            </div>
                        </div>
                        <div className="button-container">
                            <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                            <Button label="Siguiente" onClick={handleNext} />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-page">
                        <div className="form-row">
                            <div className="p-field">
                                <label htmlFor="conclusion">Conclusión</label>
                                <InputTextarea
                                    id="conclusion"
                                    name="conclusion"
                                    value={formData.conclusion}
                                    onChange={handleChange}
                                    className={errors.conclusion ? 'error-input' : ''}
                                    autoResize={false}
                                />
                                {errors.conclusion && <div className="error-message">{errors.conclusion}</div>}
                            </div>
                        </div>
                        <div className="button-container">
                            <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                            <Button label="Siguiente" onClick={handleNext} />
                        </div>
                    </div>
                );
                case 5:
                    return (
                        <div className="form-page">
                            <div className="form-row">
                                <div className="p-field">
                                    <label htmlFor="conclusion">Conclusión</label>
                                    <InputTextarea
                                        id="conclusion"
                                        name="conclusion"
                                        value={formData.conclusion}
                                        onChange={handleChange}
                                        className={errors.conclusion ? 'error-input' : ''}
                                        autoResize={false}
                                    />
                                    {errors.conclusion && <div className="error-message">{errors.conclusion}</div>}
                                </div>
                            </div>
                            <div className="button-container">
                                <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                                <Button label="Siguiente" onClick={handleNext} className="p-button-primary" />
                            </div>
                        </div>
                    );
                    case 6:
                        return (
                            <div className="form-page">
                                <div className="form-row">
                                    <div className="p-field">
                                        <label htmlFor="references">Referencias</label>
                                        <InputTextarea
                                            id="references"
                                            name="references"
                                            value={formData.references}
                                            onChange={handleChange}
                                            className={errors.references ? 'error-input' : ''}
                                            autoResize={false}
                                        />
                                        {errors.references && <div className="error-message">{errors.references}</div>}
                                    </div>
                                </div>
                                <div className="button-container">
                                    <Button label="Anterior" onClick={handlePrevious} className="p-button-secondary" />
                                    <Button type="submit" label="Crear Reporte" disabled={loading} className="p-button-primary" />
                                </div>
                            </div>
                        );
                    default:
                        return null;
                }
            };
        
            return (
                <div className="create-report-container">
                    <div className="create-report-content">
                        <div className="header">
                            <button className="close-button" onClick={() => navigate('/home')}>X</button>
                        </div>
                        <h2>Crear Reporte de Ensayo</h2>
                        <form onSubmit={handleSubmit}>
                            {renderFormPage()}
                        </form>
                    </div>
                </div>
            );
        };
        
export default CreateEssayReportForm;
                        
