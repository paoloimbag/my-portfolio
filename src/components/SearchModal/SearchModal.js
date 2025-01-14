import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const navigationItems = [
    { id: 'about', label: 'About Me', shortcut: '1' },
    { id: 'projects', label: 'Projects', shortcut: '2' },
    { id: 'experience', label: 'Experience', shortcut: '3' },
    { id: 'skills', label: 'Skills', shortcut: '4' }
  ];

  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        onNavigate(selected.id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div 
        className="search-modal" 
        onClick={e => e.stopPropagation()}
      >
        <div className="search-input-wrapper">
          <IconSearch size={16} stroke={1.5} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="search-shortcut">ESC</div>
        </div>
        
        <div className="search-results">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
            >
              <div className="item-info">
                <IconArrowRight size={16} stroke={1.5} />
                <span>{item.label}</span>
              </div>
              <div className="item-shortcut">{item.shortcut}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 