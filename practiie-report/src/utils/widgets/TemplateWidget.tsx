import React from 'react';
import './TemplateWidget.css';

interface TemplateWidgetProps {
    templateName: string;
    onClick: () => void;
    onRemove: () => void;
}

const TemplateWidget: React.FC<TemplateWidgetProps> = ({ templateName, onClick, onRemove }) => {
    return (
        <div className="template" onClick={onClick}>
            <div className="template-name">{templateName}</div>
            <button className="remove-button" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
                X
            </button>
        </div>
    );
};

export default TemplateWidget;


