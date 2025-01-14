import React from 'react';
import { 
  IconPointerFilled,
  IconHandMove,
  IconLayoutSidebar,
  IconSquare,
  IconGridDots,
  IconPencil,
  IconTypography,
  IconCode,
  IconComponents,
  IconMoon,
  IconSun
} from '@tabler/icons-react';
import './ToolsPanel.css';

const ToolsPanel = ({ selectedTool, onToolSelect, showLayers, theme, onThemeToggle }) => {
  return (
    <div className="tools-panel">
      {/* Move Tool Group */}
      <button
        className={`tool-button ${selectedTool === 'select' ? 'active' : ''}`}
        onClick={() => onToolSelect('select')}
        title="Move Tool (V)"
      >
        <IconPointerFilled size={16} />
      </button>

      {/* Frame Tools Group */}
      <div className="tools-divider" />
      <button
        className={`tool-button ${selectedTool === 'frame' ? 'active' : ''}`}
        onClick={() => onToolSelect('frame')}
        title="Frame Tool (F)"
      >
        <IconSquare size={16} />
      </button>
      <button
        className={`tool-button ${selectedTool === 'grid' ? 'active' : ''}`}
        onClick={() => onToolSelect('grid')}
        title="Grid Tool (G)"
      >
        <IconGridDots size={16} />
      </button>

      {/* Drawing Tools Group */}
      <div className="tools-divider" />
      <button
        className={`tool-button ${selectedTool === 'draw' ? 'active' : ''}`}
        onClick={() => onToolSelect('draw')}
        title="Draw Tool (P)"
      >
        <IconPencil size={16} />
      </button>
      <button
        className={`tool-button ${selectedTool === 'text' ? 'active' : ''}`}
        onClick={() => onToolSelect('text')}
        title="Text Tool (T)"
      >
        <IconTypography size={16} />
      </button>

      {/* Component Tools Group */}
      <div className="tools-divider" />
      <button
        className={`tool-button ${selectedTool === 'code' ? 'active' : ''}`}
        onClick={() => onToolSelect('code')}
        title="Code Tool (C)"
      >
        <IconCode size={16} />
      </button>
      <button
        className={`tool-button ${selectedTool === 'components' ? 'active' : ''}`}
        onClick={() => onToolSelect('components')}
        title="Components"
      >
        <IconComponents size={16} />
      </button>

      {/* Hand Tool & Layers */}
      <div className="tools-divider" />
      <button
        className={`tool-button ${selectedTool === 'hand' ? 'active' : ''}`}
        onClick={() => onToolSelect('hand')}
        title="Hand Tool (H)"
      >
        <IconHandMove size={16} />
      </button>
      <button
        className={`tool-button ${showLayers ? 'active' : ''}`}
        onClick={() => onToolSelect('layers')}
        title="Toggle Layers (L)"
      >
        <IconLayoutSidebar size={16} />
      </button>

      {/* Theme Toggle */}
      <div className="tools-divider" />
      <button
        className="tool-button"
        onClick={onThemeToggle}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
      </button>
    </div>
  );
};

export default ToolsPanel; 