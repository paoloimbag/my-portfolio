import React, { useRef, useEffect, useState, useImperativeHandle, useCallback } from 'react';
import DraggableFrame from './DraggableFrame';
import './Canvas.css';
import { IconDeviceLaptop, IconBrandGithub } from '@tabler/icons-react';

const getProjectColor = (id) => {
  // Generate a stable color based on the project ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return `hsl(${Math.abs(hash) % 360}, 70%, 75%)`;
};

const ProjectGrid = ({ projects, frameWidth, frameGap, onProjectSelect }) => {
  const projectGap = 50;
  const columns = 5;
  const projectWidth = Math.max(
    320,
    (frameWidth - (projectGap * (columns + 1))) / columns
  );
  const cardHeight = 380;

  return (
    <div className="projects-grid-container">
      {projects.map((project, index) => {
        const x = projectGap + (index % columns) * (projectWidth + projectGap);
        const y = projectGap + Math.floor(index / columns) * (cardHeight + projectGap);

        return (
          <div
            key={project.id}
            className="project-card-wrapper"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              width: `${projectWidth}px`,
              height: `${cardHeight}px`
            }}
            onClick={() => onProjectSelect(project)}
          >
            <div className="project-card">
              <div className="project-preview">
                <div 
                  className="project-thumbnail"
                  style={{
                    backgroundColor: getProjectColor(project.id)
                  }}
                />
                <div className="project-actions">
                  {project.links?.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-action-button">
                      <IconDeviceLaptop size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-action-button">
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Canvas = React.forwardRef(({ 
  selectedTool,
  sections,
  customPositions,
  frameWidth,
  frameHeight,
  frameGap,
  onFrameSelect,
  selectedFrame,
  zoom,
  onZoomChange,
  currentPage,
  onProjectSelect,
  hiddenSections,
  backgroundColor = '#FFFFFF'
}, ref) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Function to animate canvas position
  const animateCanvasPosition = (targetX, targetY, duration = 600) => {
    const startX = -offsetRef.current.x;
    const startY = -offsetRef.current.y;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutCubic)
      const easing = 1 - Math.pow(1 - progress, 3);
      
      const newX = startX + (targetX - startX) * easing;
      const newY = startY + (targetY - startY) * easing;
      
      setCanvasOffset({
        x: -newX,
        y: -newY
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Function to calculate content bounds
  const getContentBounds = () => {
    const elements = document.querySelectorAll('[data-section-id]');
    if (!elements.length) return null;
    
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      minX = Math.min(minX, rect.left);
      minY = Math.min(minY, rect.top);
      maxX = Math.max(maxX, rect.right);
      maxY = Math.max(maxY, rect.bottom);
    });
    
    return {
      width: maxX - minX,
      height: maxY - minY,
      x: minX,
      y: minY
    };
  };

  // Memoize centerContent function
  const centerContent = useCallback(() => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const contentBounds = getContentBounds();
    
    if (!contentBounds) return;
    
    const targetX = (contentBounds.x - (containerRect.width - contentBounds.width) / 2) / zoom;
    const targetY = (contentBounds.y - (containerRect.height - contentBounds.height) / 2) / zoom;
    
    animateCanvasPosition(-targetX, -targetY);
  }, [zoom]); // Add zoom as dependency

  // Reset canvas position
  const resetPosition = () => {
    centerContent();

    // Also reset zoom if needed
    if (zoom !== 1) {
      onZoomChange(1);
    }
  };

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    resetPosition,
    centerContent
  }));

  // Center content when sections change
  useEffect(() => {
    centerContent();
  }, [sections, centerContent]); // Add centerContent to dependencies

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsSpacePressed(true);
        document.body.style.cursor = 'grab';
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    // Track touch points to detect multi-touch
    let touchStartPositions = [];
    let lastTouchDistance = 0;

    const handleTouchStart = (e) => {
      // Store initial touch positions
      touchStartPositions = Array.from(e.touches).map(touch => ({
        x: touch.clientX,
        y: touch.clientY
      }));
      
      if (e.touches.length === 2) {
        e.preventDefault();
        lastTouchDistance = Math.hypot(
          touchStartPositions[0].x - touchStartPositions[1].x,
          touchStartPositions[0].y - touchStartPositions[1].y
        );
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        
        // Calculate the change in position for two-finger swipe
        const currentTouches = Array.from(e.touches).map(touch => ({
          x: touch.clientX,
          y: touch.clientY
        }));
        
        // Calculate current distance between touch points for pinch zoom
        const currentTouchDistance = Math.hypot(
          currentTouches[0].x - currentTouches[1].x,
          currentTouches[0].y - currentTouches[1].y
        );
        
        // Calculate zoom change based on pinch gesture
        if (lastTouchDistance) {
          const scale = currentTouchDistance / lastTouchDistance;
          const newZoom = Math.min(Math.max(zoom * scale, 0.1), 5);
          if (Math.abs(scale - 1) > 0.01) { // Small threshold to prevent tiny zoom changes
            onZoomChange(newZoom);
          }
        }
        
        // Calculate average movement of both fingers
        const dx = ((currentTouches[0].x - touchStartPositions[0].x) + 
                    (currentTouches[1].x - touchStartPositions[1].x)) / 2;
        const dy = ((currentTouches[0].y - touchStartPositions[0].y) + 
                    (currentTouches[1].y - touchStartPositions[1].y)) / 2;
        
        // Update canvas position
        setCanvasOffset(prev => ({
          x: prev.x + dx / zoom,
          y: prev.y + dy / zoom
        }));
        
        // Update touch positions for next move
        touchStartPositions = currentTouches;
        lastTouchDistance = currentTouchDistance;
      }
    };

    const handleTouchEnd = () => {
      touchStartPositions = [];
      lastTouchDistance = 0;
    };

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        
        // Get the current center of the viewport
        const viewportCenterX = rect.width / 2;
        const viewportCenterY = rect.height / 2;
        
        // Calculate the current canvas center position
        const canvasCenterX = -canvasOffset.x * zoom + viewportCenterX;
        const canvasCenterY = -canvasOffset.y * zoom + viewportCenterY;

        // Calculate the point to zoom towards (use viewport center)
        const zoomX = canvasCenterX;
        const zoomY = canvasCenterY;

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(zoom * delta, 0.1), 5);

        // Calculate new offset to maintain the center point
        const newOffsetX = -(zoomX / newZoom - viewportCenterX / newZoom);
        const newOffsetY = -(zoomY / newZoom - viewportCenterY / newZoom);

        onZoomChange(newZoom);
        // Update offset in a single batch with zoom change
        requestAnimationFrame(() => {
          setCanvasOffset(prev => ({
            x: newOffsetX,
            y: newOffsetY
          }));
        });
      }
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [zoom, onZoomChange, canvasOffset]);

  const handleMouseDown = (e) => {
    if (selectedTool === 'hand' || e.button === 1 || isSpacePressed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      if (isSpacePressed) {
        document.body.style.cursor = 'grabbing';
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dx = (e.clientX - dragStart.x) / zoom;
    const dy = (e.clientY - dragStart.y) / zoom;
    
    setCanvasOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (isSpacePressed) {
      document.body.style.cursor = 'grab';
    }
  };

  const handleFramePositionChange = (id, newPosition) => {
    // Update frame position in parent component
    onFrameSelect?.({
      id,
      position: newPosition,
      width: frameWidth,
      height: frameHeight
    });

    // Scroll selected frame into view
    requestAnimationFrame(() => {
      const element = document.querySelector(`[data-section-id="${id}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Calculate target position (center of viewport)
        const targetX = (rect.left - containerRect.width / 2 + rect.width / 2) / zoom;
        const targetY = (rect.top - containerRect.height / 2 + rect.height / 2) / zoom;
        
        animateCanvasPosition(targetX, targetY);
      }
    });
  };

  const handleFrameSizeChange = (id, changes) => {
    if (selectedFrame?.id === id && 
        selectedFrame.height === changes.height && 
        selectedFrame.width === changes.width) {
      return;
    }
    onFrameSelect?.({
      id,
      ...changes
    });
  };

  const getFramePosition = (section, index) => {
    if (section.id === 'projects') {
      // Grid layout for Recent Works page
      const columns = 3;
      // Calculate grid position
      const x = (index % columns) * (frameWidth + frameGap) + 40;
      const y = Math.floor(index / columns) * (frameHeight + frameGap) + 40;
      return {
        x,
        y
      };
    }
    
    // Default positions for other pages
    return customPositions[section.id] || {
      x: index * (frameWidth + frameGap) + 40,
      y: 40
    };
  };

  useEffect(() => {
    offsetRef.current = canvasOffset;
  }, [canvasOffset]);

  useEffect(() => {
    const handleScrollToSection = (event) => {
      const { id } = event.detail;
      const element = document.querySelector(`[data-section-id="${id}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Calculate target position (center of viewport)
        const targetX = (rect.left - containerRect.width / 2 + rect.width / 2) / zoom;
        const targetY = (rect.top - containerRect.height / 2 + rect.height / 2) / zoom;
        
        animateCanvasPosition(targetX, targetY);
      }
    };

    window.addEventListener('scrollToSection', handleScrollToSection);
    return () => window.removeEventListener('scrollToSection', handleScrollToSection);
  }, [zoom]); // No need to include canvasOffset in dependencies

  return (
    <div 
      ref={(el) => {
        // Combine both refs
        if (ref) {
          if (typeof ref === 'function') ref(el);
          else ref.current = el;
        }
        containerRef.current = el;
      }}
      className={`canvas-container ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="canvas-background"
        style={{ background: backgroundColor }}
      />
      <div 
        ref={canvasRef}
        className="canvas show-grid"
        style={{
          transform: `scale(${zoom}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
          transformOrigin: '50% 50%',
          width: '10000px',
          height: '10000px'
        }}
      >
        {sections.map((section, index) => !hiddenSections[section.id] && (
          section.id === 'projects' ? (
            <ProjectGrid
              key={section.id}
              data-section-id={section.id}
              projects={section.data}
              frameWidth={frameWidth}
              frameGap={frameGap}
              onProjectSelect={onProjectSelect}
            />
          ) : (
            <DraggableFrame
              key={section.id}
              data-section-id={section.id}
              id={section.id}
              title={section.label}
              position={getFramePosition(section, index)}
              width={frameWidth}
              height={frameHeight}
              zoom={zoom}
              isSelected={selectedFrame?.id === section.id}
              onPositionChange={handleFramePositionChange}
              onSizeChange={handleFrameSizeChange}
              isLocked={section.locked}
              isHidden={section.hidden}
              data={section.data}
            />
          )
        ))}
      </div>
      <div className="zoom-indicator">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
});

export default Canvas; 