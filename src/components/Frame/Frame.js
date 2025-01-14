import React from 'react';
import './Frame.css';

const Frame = ({ 
  title,
  width,
  height,
  children,
  isSelected = false
}) => {
  return (
    <div 
      className={`frame ${isSelected ? 'frame-selected' : ''}`}
      style={{
        width,
        height
      }}
    >
      <div className="frame-header">
        <span className="frame-title">{title}</span>
      </div>
      <div className="frame-content">
        {children}
      </div>
    </div>
  );
};

export default Frame; 