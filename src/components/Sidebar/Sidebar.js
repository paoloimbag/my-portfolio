import React from 'react';
import {
  IconFolder,
  IconBriefcase,
  IconUser,
  IconCode,
  IconSettings,
  IconLayoutGrid
} from '@tabler/icons-react';
import './Sidebar.css';

const Sidebar = ({ selectedTool, onToolSelect, showLayers }) => {
  return (
    <div className="sidebar">
      <div className="tool-group">
        <button
          className={`tool-btn ${selectedTool === 'select' ? 'active' : ''}`}
          onClick={() => onToolSelect('select')}
          data-tooltip="Select (V)"
        >
          <IconLayoutGrid size={20} />
        </button>
      </div>

      <div className="tool-group">
        <button
          className={`tool-btn ${selectedTool === 'about' ? 'active' : ''}`}
          onClick={() => onToolSelect('about')}
          data-tooltip="About"
        >
          <IconUser size={20} />
        </button>
        <button
          className={`tool-btn ${selectedTool === 'projects' ? 'active' : ''}`}
          onClick={() => onToolSelect('projects')}
          data-tooltip="Projects"
        >
          <IconFolder size={20} />
        </button>
        <button
          className={`tool-btn ${selectedTool === 'experience' ? 'active' : ''}`}
          onClick={() => onToolSelect('experience')}
          data-tooltip="Experience"
        >
          <IconBriefcase size={20} />
        </button>
        <button
          className={`tool-btn ${selectedTool === 'skills' ? 'active' : ''}`}
          onClick={() => onToolSelect('skills')}
          data-tooltip="Skills"
        >
          <IconCode size={20} />
        </button>
      </div>

      <div className="tool-group" style={{ marginTop: 'auto' }}>
        <button
          className={`tool-btn ${showLayers ? 'active' : ''}`}
          onClick={() => onToolSelect('layers')}
          data-tooltip="Toggle Layers"
        >
          <IconSettings size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 