import React from 'react';
import './ExperienceContent.css';

const ExperienceContent = ({ data, onHeightChange }) => {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      onHeightChange?.(height + 64); // Add padding
    }
  }, [data, onHeightChange]);

  if (!data || !Array.isArray(data)) {
    return <div>No experience available</div>;
  }

  return (
    <div className="experience-content" ref={contentRef}>
      {data.map((experience) => (
        <div key={experience.id} className="experience-item">
          <div className="experience-header">
            <div className="experience-title">
              <h3>{experience.company}</h3>
              <span className="experience-role">{experience.role}</span>
            </div>
            <div className="experience-meta">
              <span className="experience-period">{experience.period}</span>
              <span className="experience-location">{experience.location}</span>
            </div>
          </div>
          
          <ul className="experience-description">
            {experience.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="experience-technologies">
            {experience.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceContent; 