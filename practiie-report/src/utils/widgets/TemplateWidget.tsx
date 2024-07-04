import React from 'react';
import './TemplateWidget.css';

interface TemplateWidgetProps {
    templateName: string;
    onClick: () => void;
}

const TemplateWidget: React.FC<TemplateWidgetProps> = ({ templateName, onClick }) => {
    return (
        <div className="template" onClick={onClick}>
            <div className="template-name">{templateName}</div>
        </div>
    );
};

export default TemplateWidget;
