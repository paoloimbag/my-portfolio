import React, { useState } from 'react';
import { IconBell, IconMail, IconBrandFigma } from '@tabler/icons-react';
import './Notifications.css';

const Notifications = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification] = useState(true); // Always show notification for visitors
  const email = "hey@paoloimbag.com"; // Replace with your email

  const handleProjectClick = () => {
    setIsOpen(false); // Close the dropdown
    onNavigate?.('recent-works'); // Navigate to Recent Works page
  };

  return (
    <div className="notifications-wrapper">
      <button 
        className={`notification-button ${isOpen ? 'active' : ''} ${hasNotification ? 'has-notification' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconBell size={20} />
        {hasNotification && <span className="notification-indicator" />}
      </button>

      {isOpen && (
        <>
          <div className="notifications-overlay" onClick={() => setIsOpen(false)} />
          <div className="notifications-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
            </div>
            <div className="notification-content">
              <div className="notification-item" onClick={handleProjectClick}>
                <div className="notification-icon">
                  <IconBrandFigma size={20} />
                </div>
                <div className="notification-text">
                  <h4>New Project Added</h4>
                  <p>Check out my latest Figma design system project</p>
                  <span className="notification-time">Just now</span>
                </div>
              </div>
              <div className="notification-divider" />
              <div className="contact-message">
                <p>I'm always open to discussing new projects and opportunities.</p>
                <a href={`mailto:${email}`} className="contact-button">
                  <IconMail size={16} />
                  <span>Contact Me</span>
                </a>
                <div className="email-display">
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications; 