import React from 'react';
import { IconZoomIn, IconZoomOut, IconMaximize } from '@tabler/icons-react';
import './ZoomControls.css';

const ZoomControls = ({ zoom, onZoomChange }) => {
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 5);
    onZoomChange?.(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1);
    onZoomChange?.(newZoom);
  };

  const handleZoomReset = () => {
    onZoomChange?.(1);
  };

  return (
    <div className="zoom-controls">
      <button 
        className="icon-button" 
        onClick={handleZoomOut} 
        title="Zoom Out"
      >
        <IconZoomOut size={16} />
      </button>
      <span 
        className="zoom-level" 
        onClick={handleZoomReset} 
        title="Reset Zoom"
      >
        {Math.round(zoom * 100)}%
      </span>
      <button 
        className="icon-button" 
        onClick={handleZoomIn} 
        title="Zoom In"
      >
        <IconZoomIn size={16} />
      </button>
      <button 
        className="icon-button" 
        onClick={handleZoomReset} 
        title="Fit to Screen"
      >
        <IconMaximize size={16} />
      </button>
    </div>
  );
};

export default ZoomControls; 