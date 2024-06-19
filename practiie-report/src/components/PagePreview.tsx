import React from 'react';
import parse from 'html-react-parser';

interface PagePreviewProps {
  content: string;
}

const PagePreview: React.FC<PagePreviewProps> = ({ content }) => {
  return (
    <div className="page-preview">
      {parse(content)}
    </div>
  );
};

export default PagePreview;
