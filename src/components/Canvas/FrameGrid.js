import React from 'react';
import Frame from '../Frame/Frame';

const FrameGrid = ({ 
  sections,
  frameWidth,
  frameHeight,
  customPositions = {}
}) => {
  return (
    <>
      {sections.map((section) => {
        const position = customPositions[section.id] || { x: 0, y: 0 };

        return (
          <div
            key={section.id}
            className="frame-container"
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              transition: 'all 0.3s ease'
            }}
          >
            <Frame
              title={section.label}
              width={frameWidth}
              height={frameHeight}
            >
              {section.data && (
                <div className="section-content">
                  {section.id === 'projects' && (
                    <div className="projects-grid">
                      {section.data.map(project => (
                        <div key={project.id} className="project-item">
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <div className="project-tools">
                            {project.tools.map(tool => (
                              <span key={tool} className="tool-tag">{tool}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === 'experience' && (
                    <div className="experience-timeline">
                      {section.data.map(exp => (
                        <div key={exp.id} className="experience-item">
                          <div className="experience-header">
                            <h3>{exp.company}</h3>
                            <p className="role">{exp.role}</p>
                            <p className="period">{exp.period}</p>
                          </div>
                          <ul className="responsibilities">
                            {exp.description.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                          <div className="technologies">
                            {exp.technologies.map(tech => (
                              <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.id === 'about' && (
                    <div className="about-content">
                      <h2>About</h2>
                      <p>Content for about section...</p>
                    </div>
                  )}
                </div>
              )}
            </Frame>
          </div>
        );
      })}
    </>
  );
};

export default FrameGrid; 