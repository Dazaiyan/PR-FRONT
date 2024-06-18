import React from 'react';
import './TemplateWidget.css';

interface TemplateWidgetProps {
    imageSrc: string;
    onClick: () => void;
    onRemove: () => void; // Añadir la prop onRemove
}

const TemplateWidget: React.FC<TemplateWidgetProps> = ({ imageSrc, onClick, onRemove }) => {
    return (
        <div className="template" onClick={onClick}>
            <img src={imageSrc} alt="Template Icon" />
            <button className="remove-button" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
                X
            </button>
        </div>
    );
};

export default TemplateWidget;

