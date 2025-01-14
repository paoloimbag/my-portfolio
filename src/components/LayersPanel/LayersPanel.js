import React, { useState } from 'react';
import { 
  IconChevronRight,
  IconEyeOff,
  IconEye,
  IconLock,
  IconLockOpen
} from '@tabler/icons-react';
import './LayersPanel.css';

const LayersPanel = ({ 
  sections, 
  selectedSection, 
  onSectionSelect,
  onVisibilityChange,
  hiddenSections
}) => {
  const [collapsedSections, setCollapsedSections] = useState({});
  const [lockedSections, setLockedSections] = useState({});

  const toggleCollapse = (id) => {
    setCollapsedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleVisibility = (e, id) => {
    e.stopPropagation();
    onVisibilityChange?.(id, !hiddenSections[id]);
  };

  const toggleLock = (e, id) => {
    e.stopPropagation();
    setLockedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSectionSelect = (id) => {
    onSectionSelect?.(id);
    // Emit a custom event to notify Canvas to scroll
    window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { id } }));
  };

  return (
    <div className="layers-panel">
      <div className="layers-header">
        <h2>Layers</h2>
      </div>
      <div className="layers-list">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`layer-item ${selectedSection === section.id ? 'selected' : ''}`}
          >
            <div 
              className="layer-header"
              onClick={() => handleSectionSelect(section.id)}
            >
              <button 
                className={`collapse-button ${collapsedSections[section.id] ? 'collapsed' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(section.id);
                }}
              >
                <IconChevronRight size={16} />
              </button>
              {section.icon && <section.icon size={16} />}
              <span className="layer-title">{section.label}</span>
              <div className="layer-actions">
                <button 
                  className="layer-action-button"
                  onClick={(e) => toggleVisibility(e, section.id)}
                >
                  {hiddenSections[section.id] ? (
                    <IconEyeOff size={16} />
                  ) : (
                    <IconEye size={16} />
                  )}
                </button>
                <button 
                  className="layer-action-button"
                  onClick={(e) => toggleLock(e, section.id)}
                >
                  {lockedSections[section.id] ? (
                    <IconLock size={16} />
                  ) : (
                    <IconLockOpen size={16} />
                  )}
                </button>
              </div>
            </div>
            {!collapsedSections[section.id] && section.data && (
              <div className="layer-content">
                {Array.isArray(section.data) && section.data.map((item, index) => (
                  <div key={item.id || index} className="layer-subitem">
                    <span>{item.title || item.company}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel; 