import React, { useEffect, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';

interface DocumentPreviewProps {
  filePath: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ filePath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      if (containerRef.current) {
        const document = await renderAsync(arrayBuffer, containerRef.current, undefined, { ignoreWidth: true, ignoreHeight: true });
        setDoc(document);
      }
    };

    fetchDocument();
  }, [filePath]);

  const handleNextPage = () => {
    if (doc && currentPage < doc.parts.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (doc && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (doc && containerRef.current) {
      const allPages = containerRef.current.querySelectorAll('.dpx-page');
      allPages.forEach((page, index) => {
        if (index === currentPage) {
          (page as HTMLElement).style.display = 'block';
        } else {
          (page as HTMLElement).style.display = 'none';
        }
      });
    }
  }, [currentPage, doc]);

  return (
    <div className="document-preview-container">
      <div className="document-preview-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>{"<"}</button>
        <button onClick={handleNextPage} disabled={doc && currentPage === doc.parts.length - 1}>{">"}</button>
      </div>
      <div className="document-preview" ref={containerRef}></div>
    </div>
  );
};

export default DocumentPreview;
