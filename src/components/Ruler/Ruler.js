import React from 'react';
import './Ruler.css';

const Ruler = ({ scale, offset, type }) => {
  const size = type === 'horizontal' ? window.innerWidth : window.innerHeight;
  const count = Math.ceil(size / (100 * scale));
  const ticks = [];
  
  // Calculate the starting point to include negative values
  const startPosition = Math.floor((-offset / (100 * scale)) - 1);
  const endPosition = startPosition + count + 1;

  // Calculate the actual pixel position for measurements
  const getPixelPosition = (i) => {
    const pixels = i * 100;
    return pixels >= 0 ? pixels : pixels;
  };

  for (let i = startPosition; i < endPosition; i++) {
    const position = i * 100 * scale + offset;
    const pixelPosition = getPixelPosition(i);
    
    // Add main tick with number
    ticks.push(
      <div 
        key={i} 
        className="ruler-tick"
        style={{
          [type === 'horizontal' ? 'left' : 'top']: `${position}px`
        }}
      >
        <span className="ruler-number">{Math.abs(pixelPosition)}</span>
      </div>
    );

    // Add small ticks (10px intervals)
    for (let j = 1; j < 10; j++) {
      const smallTickPosition = position + (j * 10 * scale);
      const isMiddle = j === 5;
      ticks.push(
        <div 
          key={`${i}-${j}`} 
          className={`ruler-tick-small ${isMiddle ? 'ruler-tick-medium' : ''}`}
          style={{
            [type === 'horizontal' ? 'left' : 'top']: `${smallTickPosition}px`
          }}
        />
      );
    }
  }

  return (
    <div className={`ruler ${type}`}>
      {ticks}
    </div>
  );
};

export default Ruler; 