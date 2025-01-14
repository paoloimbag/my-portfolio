import React from 'react';
import { 
  IconX, 
  IconDeviceLaptop, 
  IconBrandGithub,
  IconCalendar,
  IconClock,
  IconArrowUpRight,
  IconBriefcase,
  IconUser,
  IconClock24
} from '@tabler/icons-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <IconX size={24} />
        </button>
        
        <div className="modal-content">
          <div className="modal-header">
            <div 
              className="modal-thumbnail"
              style={{
                backgroundColor: project.thumbnail || `hsl(${Math.random() * 360}, 70%, 75%)`
              }}
            />
            <div className="modal-title-wrapper">
              <h2 className="modal-title">{project.title}</h2>
              <div className="modal-meta">
                <div className="modal-meta-group">
                  <span className="modal-meta-item">
                    <IconBriefcase size={16} />
                    {project.role || 'Lead Developer'}
                  </span>
                  <span className="modal-meta-item">
                    <IconClock24 size={16} />
                    {project.duration || '3 months'}
                  </span>
                  <span className="modal-meta-item">
                    <IconCalendar size={16} />
                    {project.year || '2024'}
                  </span>
                  <span className="modal-meta-item">
                    <IconUser size={16} />
                    {project.client || 'Personal Project'}
                  </span>
                </div>
                <div className="modal-dates">
                  <span className="modal-date">
                    <IconCalendar size={16} />
                    Completed {project.completedAt}
                  </span>
                  <span className="modal-date">
                    <IconClock size={16} />
                    Last updated {project.lastModified}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-section">
              <h3>Overview</h3>
              <p className="modal-description">{project.description}</p>
            </div>

            <div className="modal-section">
              <h3>Challenges</h3>
              <ul className="modal-list">
                {project.challenges?.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                )) || (
                  <li>No challenges documented</li>
                )}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Solution</h3>
              <p className="modal-description">{project.solution || 'No solution documented'}</p>
            </div>

            <div className="modal-section">
              <h3>Technologies Used</h3>
              <div className="modal-technologies">
                {project.technologies?.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {project.images && (
              <div className="modal-section">
                <h3>Project Images</h3>
                <div className="modal-images">
                  {project.images.map((image, index) => (
                    <div key={index} className="modal-image-wrapper">
                      <img 
                        src={image.url} 
                        alt={image.caption || `Project image ${index + 1}`}
                        className="modal-image"
                      />
                      {image.caption && (
                        <p className="modal-image-caption">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-section">
              <h3>Links</h3>
              <div className="modal-links">
                {project.links?.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link-button"
                  >
                    <IconDeviceLaptop size={20} />
                    <span>Live Demo</span>
                    <IconArrowUpRight size={16} />
                  </a>
                )}
                {project.links?.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link-button"
                  >
                    <IconBrandGithub size={20} />
                    <span>Source Code</span>
                    <IconArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 