import React from 'react';
import { 
  IconPlus,
  IconDots,
  IconLayoutDashboard,
  IconBriefcase
} from '@tabler/icons-react';
import './PagesPanel.css';

const PagesPanel = ({ currentPage, onPageSelect }) => {
  const pages = [
    { 
      id: 'home',
      label: 'Home',
      icon: IconLayoutDashboard
    },
    { 
      id: 'recent-works',
      label: 'Recent Works',
      icon: IconBriefcase
    }
  ];

  return (
    <div className="pages-panel">
      <div className="pages-header">
        <h2>Pages</h2>
        <div className="pages-actions">
          <button className="icon-button" title="Add page">
            <IconPlus size={16} />
          </button>
          <button className="icon-button" title="More options">
            <IconDots size={16} />
          </button>
        </div>
      </div>

      <div className="pages-list">
        {pages.map((page) => (
          <div 
            key={page.id}
            className={`page-item ${currentPage === page.id ? 'selected' : ''}`}
            onClick={() => onPageSelect?.(page.id)}
          >
            <div className="page-icon">
              <page.icon size={16} />
            </div>
            <span className="page-name">{page.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesPanel; 