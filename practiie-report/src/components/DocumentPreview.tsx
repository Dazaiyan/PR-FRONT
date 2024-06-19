import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './DocumentPreview.css';

interface DocumentPreviewProps {
  filePath: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ filePath }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="document-preview-container">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js`}>
        <div className="document-preview">
          <Viewer fileUrl={filePath} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
};

export default DocumentPreview;
