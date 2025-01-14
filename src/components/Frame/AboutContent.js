import React from 'react';
import './AboutContent.css';

const AboutContent = ({ data }) => {
  return (
    <div className="about-content">
      <div className="about-header">
        <h1>{data.title}</h1>
        <p className="intro">{data.intro}</p>
      </div>

      <div className="quick-info">
        {data.quickInfo.map((info, index) => (
          <div key={index} className="info-item">
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </div>
        ))}
      </div>

      <div className="approach-section">
        <h2>{data.approach.title}</h2>
        <p>{data.approach.description}</p>
      </div>

      <div className="process-section">
        <h2>{data.process.title}</h2>
        <div className="process-steps">
          {data.process.steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutContent; 