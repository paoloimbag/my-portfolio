import React, { useState, useCallback } from 'react';
import ProjectContent from './content/ProjectContent';
import ExperienceContent from './content/ExperienceContent';
import './DraggableFrame.css';

const MIN_SIZE = 200;
const GRID_SIZE = 20;

const DraggableFrame = ({
  id,
  title,
  content,
  position,
  width,
  height,
  zoom,
  isSelected,
  onPositionChange,
  onSizeChange,
  isLocked,
  isHidden,
  data
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState('');
  const [contentHeight, setContentHeight] = useState(height);

  const snapToGrid = useCallback((value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging && !isResizing) return;

    if (isDragging) {
      const newX = (e.clientX / zoom) - dragOffset.x;
      const newY = (e.clientY / zoom) - dragOffset.y;
      
      onPositionChange?.(id, {
        x: snapToGrid(newX),
        y: snapToGrid(newY)
      });
    }

    if (isResizing) {
      const dx = (e.clientX - dragOffset.x) / zoom;
      const dy = (e.clientY - dragOffset.y) / zoom;
      
      let newWidth = width;
      let newHeight = height;
      let newX = position.x;
      let newY = position.y;

      switch (resizeHandle) {
        case 'top-left':
          newWidth = width - dx;
          newHeight = height - dy;
          newX = position.x + dx;
          newY = position.y + dy;
          break;
        case 'top-right':
          newWidth = width + dx;
          newHeight = height - dy;
          newY = position.y + dy;
          break;
        case 'bottom-left':
          newWidth = width - dx;
          newHeight = height + dy;
          newX = position.x + dx;
          break;
        case 'bottom-right':
          newWidth = width + dx;
          newHeight = height + dy;
          break;
        default:
          break;
      }

      // Snap to grid and enforce minimum size
      newWidth = Math.max(snapToGrid(newWidth), MIN_SIZE);
      newHeight = Math.max(snapToGrid(newHeight), MIN_SIZE);
      newX = snapToGrid(newX);
      newY = snapToGrid(newY);

      onSizeChange?.(id, {
        width: newWidth,
        height: newHeight,
        position: { x: newX, y: newY }
      });

      setDragOffset({
        x: e.clientX,
        y: e.clientY
      });
    }
  }, [isDragging, isResizing, dragOffset, zoom, id, onPositionChange, resizeHandle, width, height, position, onSizeChange, snapToGrid]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0 || isLocked) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    e.stopPropagation();
  }, [isLocked, zoom, handleMouseMove, handleMouseUp]);

  const handleResizeStart = useCallback((e, handle) => {
    if (isLocked) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    setDragOffset({
      x: e.clientX,
      y: e.clientY
    });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isLocked, handleMouseMove, handleMouseUp]);

  const handleContentHeight = useCallback((newHeight) => {
    if (newHeight !== contentHeight) {
      setContentHeight(newHeight);
      onSizeChange?.(id, {
        position,
        width,
        height: newHeight
      });
    }
  }, [id, position, width, contentHeight, onSizeChange]);

  if (isHidden) return null;

  const renderContent = () => {
    switch (id) {
      case 'projects':
        return <ProjectContent data={data} />;
      case 'experience':
        return <ExperienceContent data={data} onHeightChange={handleContentHeight} />;
      case 'about':
        return <div>About Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div
      className={`frame ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isLocked ? 'locked' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${width}px`,
        height: `${height}px`,
        minHeight: id === 'experience' ? '400px' : 'auto',
        display: isHidden ? 'none' : 'block'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="frame-header">
        <span className="frame-title">{title}</span>
      </div>
      <div className="frame-content">
        {renderContent()}
      </div>
      {isSelected && !isLocked && (
        <>
          <div
            className="resize-handle top-left"
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          />
          <div
            className="resize-handle top-right"
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          />
          <div
            className="resize-handle bottom-left"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
          <div
            className="resize-handle bottom-right"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
        </>
      )}
    </div>
  );
};

export default DraggableFrame; 