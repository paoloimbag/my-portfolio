import React, { useRef, useEffect } from 'react';

const ExperienceContent = ({ data, onHeightChange }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      requestAnimationFrame(() => {
        onHeightChange(height);
      });
    }
  }, [onHeightChange, data]);

  return (
    <div ref={contentRef} className="frame-content">
      {/* ... content ... */}
    </div>
  );
};

export default ExperienceContent; 