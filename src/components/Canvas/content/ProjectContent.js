import React from 'react';
import { 
  IconUser, 
  IconClock,
  IconBrandGithub,
  IconExternalLink,
  IconDeviceLaptop
} from '@tabler/icons-react';
import './ProjectContent.css';

const ProjectContent = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div>No projects available</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="project-content">
      <div className="projects-grid">
        {data.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-preview">
              <div 
                className="project-thumbnail"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 75%)`
                }}
              />
              <div className="project-actions">
                {project.links?.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-button"
                  >
                    <IconDeviceLaptop size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.links?.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-button"
                  >
                    <IconBrandGithub size={16} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies?.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-meta">
                <div className="project-owner">
                  <IconUser size={14} />
                  <span>{project.owner}</span>
                </div>
                <div className="project-dates">
                  <div className="project-completed">
                    <IconExternalLink size={14} />
                    <span>Completed {formatDate(project.completedAt)}</span>
                  </div>
                  <div className="project-modified">
                    <IconClock size={14} />
                    <span>Modified {formatDate(project.lastModified)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectContent; 