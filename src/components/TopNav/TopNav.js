import React, { useState } from 'react';
import {
  IconSearch,
  IconShare2,
  IconChevronRight,
  IconX,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
} from '@tabler/icons-react';
import './TopNav.css';

const TopNav = ({ 
  currentSection, 
  onNavigate, 
  zoom,
  onZoomChange 
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="top-nav">
      <div className="nav-section">
        <div className="breadcrumb">
          <span className="breadcrumb-root">Portfolio</span>
          <IconChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{currentSection}</span>
        </div>
      </div>

      <div className="nav-section">
        {isSearching ? (
          <div className="search-container">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              className="icon-button"
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
            >
              <IconX size={16} />
            </button>
          </div>
        ) : (
          <div className="nav-actions">
            <div className="zoom-controls">
              <button className="icon-button" onClick={handleZoomOut} title="Zoom Out">
                <IconZoomOut size={16} />
              </button>
              <span className="zoom-level" onClick={handleZoomReset} title="Reset Zoom">
                {Math.round(zoom * 100)}%
              </span>
              <button className="icon-button" onClick={handleZoomIn} title="Zoom In">
                <IconZoomIn size={16} />
              </button>
              <button className="icon-button" onClick={handleZoomReset} title="Fit to Screen">
                <IconMaximize size={16} />
              </button>
            </div>

            <div className="nav-buttons">
              <button 
                className="icon-button" 
                onClick={() => setIsSearching(true)}
                title="Search"
              >
                <IconSearch size={16} />
              </button>
              <button 
                className="icon-button" 
                onClick={() => {}} 
                title="Share"
              >
                <IconShare2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav; 