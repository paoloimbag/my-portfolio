import React, { useState } from 'react';
import {
  IconDownload,
  IconChevronDown,
  IconPalette,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandDribbble,
  IconExternalLink
} from '@tabler/icons-react';
import './PropertiesPanel.css';

const SectionHeader = ({ title, collapsed, onToggle }) => (
  <div 
    className={`properties-section-header ${collapsed ? 'collapsed' : ''}`}
    onClick={onToggle}
  >
    <IconChevronDown size={16} />
    <h3>{title}</h3>
  </div>
);

const getComputedColor = (cssVar) => {
  if (cssVar.startsWith('var(')) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar.slice(4, -1))
      .trim();
  }
  return cssVar;
};

const SocialIcon = ({ id }) => {
  switch (id) {
    case 'github':
      return <IconBrandGithub size={14} />;
    case 'linkedin':
      return <IconBrandLinkedin size={14} />;
    case 'twitter':
      return <IconBrandTwitter size={14} />;
    case 'dribbble':
      return <IconBrandDribbble size={14} />;
    default:
      return <IconExternalLink size={14} />;
  }
};

const PropertiesPanel = ({ onCanvasColorChange, canvasColor, socialLinks }) => {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <a 
          href="/assets/cv.pdf" 
          download="YourName_CV.pdf"
          className="download-cv-button"
        >
          <IconDownload size={14} />
          <span>Download CV</span>
        </a>
      </div>

      <div className="properties-section">
        <SectionHeader 
          title="APPEARANCE"
          collapsed={collapsedSections.appearance}
          onToggle={() => toggleSection('appearance')}
        />
        {!collapsedSections.appearance && (
          <div className="property-group">
            <div className="color-field">
              <label>
                <IconPalette size={14} />
                <span>Background</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={getComputedColor(canvasColor)}
                  onChange={(e) => onCanvasColorChange(e.target.value)}
                  title="Change canvas background color"
                />
                <span>{getComputedColor(canvasColor).toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="properties-section">
        <SectionHeader 
          title="MY SOCIALS"
          collapsed={collapsedSections.socials}
          onToggle={() => toggleSection('socials')}
        />
        {!collapsedSections.socials && (
          <div className="property-group">
            {socialLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <SocialIcon id={link.id} />
                <span>{link.label}</span>
                <IconExternalLink size={12} className="external-icon" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel; 