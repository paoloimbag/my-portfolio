import React from 'react';
import ZoomControls from './ZoomControls';
import Notifications from './Notifications';
import './TopNav.css';

const TopNav = ({ currentSection, zoom, onZoomChange, onNavigate }) => {
  return (
    <div className="top-nav">
      <div className="section-title">{currentSection}</div>
      <div className="top-nav-controls">
        <Notifications onNavigate={onNavigate} />
        <ZoomControls 
          zoom={zoom}
          onZoomChange={onZoomChange}
        />
      </div>
    </div>
  );
};

export default TopNav; 