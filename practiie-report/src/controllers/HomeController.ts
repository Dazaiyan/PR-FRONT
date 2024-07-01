import { useState } from 'react';

const HomeController = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; filePath: string } | null>(null);
    const [templates, setTemplates] = useState<{ id: number; name: string; filePath: string }[]>([
        { id: 1, name: 'Plantilla - Laboratorio', filePath: '/INFORMES DE PRACTICAS PRE-PROFESIONALES.pdf' },
        { id: 2, name: 'Plantilla - Laboratorio', filePath: '/INFORMES DE PRACTICAS PRE-PROFESIONALES.pdf' },
    ]);

    const openModal = (template: { id: number; name: string; filePath: string }) => {
        setSelectedTemplate(template);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTemplate(null);
    };

    const handleRemoveTemplate = (id: number) => {
        const updatedTemplates = templates.filter(template => template.id !== id);
        setTemplates(updatedTemplates);
    };

    return {
        modalVisible,
        setModalVisible,
        selectedTemplate,
        setSelectedTemplate,
        templates,
        setTemplates,
        openModal,
        closeModal,
        handleRemoveTemplate
    };
};

export default HomeController;
