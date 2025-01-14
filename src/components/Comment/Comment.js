import React, { useState } from 'react';
import { IconMessageDots, IconX } from '@tabler/icons-react';
import './Comment.css';

const Comment = ({ x, y, onClose, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(comment);
    setComment('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button 
        className="comment-bubble"
        style={{ left: x, top: y }}
        onClick={() => setIsExpanded(true)}
      >
        <IconMessageDots size={16} stroke={1.5} />
      </button>
    );
  }

  return (
    <div className="comment-popup" style={{ left: x, top: y }}>
      <div className="comment-header">
        <span>Add Comment</span>
        <button className="close-btn" onClick={onClose}>
          <IconX size={16} stroke={1.5} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          autoFocus
        />
        <div className="comment-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!comment.trim()}
          >
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment; 