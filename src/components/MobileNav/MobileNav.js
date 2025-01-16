import React from 'react';
import { 
  IconLayoutDashboard,
  IconBriefcase
} from '@tabler/icons-react';
import './MobileNav.css';

const MobileNav = ({ currentPage, onPageSelect }) => {
  const pages = [
    { 
      id: 'home',
      label: 'Home',
      icon: IconLayoutDashboard
    },
    { 
      id: 'recent-works',
      label: 'Works',
      icon: IconBriefcase
    }
  ];

  return (
    <div className="mobile-nav">
      {pages.map((page) => (
        <button
          key={page.id}
          className={`mobile-nav-item ${currentPage === page.id ? 'active' : ''}`}
          onClick={() => onPageSelect(page.id)}
        >
          <page.icon size={20} />
          <span>{page.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNav; 