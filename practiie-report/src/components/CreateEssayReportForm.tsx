import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Loader from '../utils/Loader';
import './CreateReport.css';

const CreateEssayReportForm: React.FC = () => {
    const [formData, setFormData] = useState({
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

    const [loading, setLoading] = useState(false);
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

    return (
        <div className="create-report-container">
            <div className="create-report-content">
                <div className="header">
                    <button className="close-button" onClick={() => navigate('/home')}>X</button>
                </div>
                <h2>Crear Reporte de Ensayo</h2>
                <form onSubmit={handleSubmit}>
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
                                <InputText
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className={errors.dueDate ? 'error-input' : ''}
                                />
                                {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
                            </div>
                        </div>
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
                        <div className="button-container centered">
                            <Button type="submit" disabled={loading} className="submit-button">
                                {loading ? <Loader /> : 'Crear Reporte'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEssayReportForm;
