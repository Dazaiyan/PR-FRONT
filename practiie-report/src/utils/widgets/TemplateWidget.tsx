import React from 'react';
import './TemplateWidget.css';

interface TemplateWidgetProps {
  imageSrc: string;
}

const TemplateWidget: React.FC<TemplateWidgetProps> = ({ imageSrc }) => {
  return (
    <div className="template">
      <img src={imageSrc} alt="Template Icon" />
    </div>
  );
};

export default TemplateWidget;
