import React from 'react';
import './DocumentViewer.css';

interface DocumentViewerProps {
  template: { name: string; file: File };
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ template, onClose }) => {
  return (
    <div className="document-viewer">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>{template.name}</h2>
      <iframe src={URL.createObjectURL(template.file)} width="100%" height="500px" title={template.name}></iframe>
    </div>
  );
};

export default DocumentViewer;

