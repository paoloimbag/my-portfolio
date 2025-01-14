import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical, IconEye } from '@tabler/icons-react';

export const LayerItem = ({ section, isActive, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const Icon = section.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`layer-item ${isActive ? 'active' : ''}`}
      {...attributes}
    >
      <div className="layer-item-content">
        <div className="drag-handle" {...listeners}>
          <IconGripVertical size={16} stroke={1.5} />
        </div>
        
        <div className="layer-info" onClick={onClick}>
          <Icon size={16} stroke={1.5} />
          <span className="layer-name">{section.label}</span>
        </div>
        
        <button className="layer-visibility">
          <IconEye size={16} stroke={1.5} />
        </button>
      </div>

      {section.children && (
        <div className="layer-children">
          {section.children.map(child => (
            <div key={child.id} className="layer-child">
              <child.icon size={14} stroke={1.5} />
              <span>{child.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 