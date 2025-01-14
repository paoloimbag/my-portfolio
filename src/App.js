import React, { useState, useRef, useEffect } from 'react';
import {
  IconFolder,
  IconBriefcase,
  IconUser
} from '@tabler/icons-react';
import TopNav from './components/TopNav/TopNav';
import Canvas from './components/Canvas/Canvas';
import LayersPanel from './components/LayersPanel/LayersPanel';
import PagesPanel from './components/PagesPanel/PagesPanel';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import ToolsPanel from './components/ToolsPanel/ToolsPanel';
import './App.css';
import { sampleProjects } from './data/sampleProjects';
import ProjectModal from './components/ProjectModal/ProjectModal';

const FRAME_WIDTH = 800;
const FRAME_HEIGHT = 800;
const FRAME_GAP = 100;

const getFrameDimensions = (page) => {
  switch (page) {
    case 'recent-works':
      return {
        width: 1200,
        height: 800
      };
    case 'home':
      return {
        width: 800,
        height: 'auto'
      };
    default:
      return {
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT
      };
  }
};

const App = () => {
  const workExperience = [
    {
      id: 'exp-1',
      company: 'Pilothouse Digital',
      role: 'Visual & Graphic Designer for DTC',
      period: 'Jun 2021 - Present',
      location: 'Victoria, British Columbia, Canada · Remote',
      description: [
        'Led the design of digital media campaigns for DTC, collaborating with internal teams to meet time-sensitive deadlines',
        'Created branding for third-party build-outs, contributing to marketing collateral creation',
        'Provided valuable insights on the latest design trends to enhance creative strategy'
      ],
      technologies: ['Graphic Design', 'Digital Media', 'Branding', 'Marketing', 'Adobe Creative Suite']
    },
    {
      id: 'exp-2',
      company: 'Muni Studio',
      role: 'Digital Designer',
      period: 'Apr 2014 - Present',
      location: 'Toronto, Ontario, Canada',
      description: [
        'Led creative design projects for small businesses, specializing in UIUX, graphic design, branding, and design direction',
        'Collaborated with clients to understand their brand vision and deliver innovative design solutions',
        'Increased client satisfaction and brand visibility through visually appealing and user-friendly designs',
        'Established Muni Studio as a go-to design agency for small businesses in the Philippines'
      ],
      technologies: ['UI/UX Design', 'Brand Strategy', 'Design Direction', 'Client Relations', 'Web Design']
    },
    {
      id: 'exp-3',
      company: 'Oddup',
      role: 'Product Designer (UI/UX)',
      period: 'Jan 2020 - Jul 2022',
      location: 'Los Angeles, California, United States',
      description: [
        'Defined and documented optimal user experiences by collaborating with product and development teams',
        'Conducted concept and usability testing to gather feedback for iterative design refinement',
        'Presented hi-fidelity mock-ups and prototypes to stakeholders for effective communication',
        'Developed UI design guidelines to establish consistency and provide a framework for future projects'
      ],
      technologies: ['Product Design', 'User Experience', 'Prototyping', 'Figma', 'Design Systems']
    },
    {
      id: 'exp-4',
      company: 'iStack Holdings',
      role: 'Visual Designer',
      period: 'May 2015 - Dec 2019',
      location: 'Makati · Hybrid',
      description: [
        'Led UI/UX design for the AMC Education Platform, enhancing user experience',
        'Developed visually appealing materials for iStack Training to effectively communicate concepts',
        'Oversaw visual direction for the SW Conference, ensuring a cohesive brand presence'
      ],
      technologies: ['Visual Design', 'UI/UX', 'Educational Design', 'Brand Identity', 'Adobe XD']
    }
  ];

  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showLayers, setShowLayers] = useState(true);
  const canvasRef = useRef();
  const customPositions = {
    about: { x: 40, y: 40 },
    experience: { x: FRAME_WIDTH + 80, y: 40 }
  };

  const centerContent = () => {
    if (canvasRef.current) {
      canvasRef.current.centerContent();
    }
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
    if (toolId === 'layers') {
      setShowLayers(!showLayers);
    } else {
      setTimeout(centerContent, 0);
    }
  };

  const handleFrameSelect = (id) => {
    const { width, height } = getFrameDimensions(currentPage);
    const initialHeight = height === 'auto' ? 400 : height;
    setSelectedFrame({
      id,
      position: customPositions[id] || { x: 0, y: 0 },
      width,
      height: initialHeight
    });
    
    // Trigger scroll to selected frame
    const event = new CustomEvent('scrollToSection', { detail: { id } });
    window.dispatchEvent(event);
  };

  const handleFrameUpdate = (frame) => {
    setSelectedFrame(frame);
    if (frame.id === 'experience') {
      customPositions[frame.id] = {
        ...frame.position,
        manualHeight: frame.height
      };
    }
  };

  // Center content on initial load
  useEffect(() => {
    centerContent();
  }, []);

  const [theme, setTheme] = useState('light');
  const [zoom, setZoom] = useState(1);
  const [customCanvasColor, setCustomCanvasColor] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    setCustomCanvasColor(null);
  };

  const handleCanvasColorChange = (color) => {
    setCustomCanvasColor(color);
  };

  const canvasColor = customCanvasColor || 'var(--canvas-bg)';

  const [currentPage, setCurrentPage] = useState('home');

  const aboutData = {
    title: "Digital Designer & Problem Solver",
    intro: "I'm a Digital Designer with over a decade of experience crafting digital experiences and building brands. Based in Toronto, I specialize in UI/UX design, visual design, and branding for businesses worldwide.",
    quickInfo: [
      {
        title: "Experience",
        description: "10+ years in digital design, working with startups and established brands."
      },
      {
        title: "Expertise",
        description: "UI/UX Design, Visual Design, Brand Identity, Web Development"
      },
      {
        title: "Location",
        description: "Based in Toronto, Canada. Working globally."
      }
    ],
    approach: {
      title: "My Approach",
      description: "My approach combines aesthetic sensibility with strategic thinking, ensuring that every design not only looks beautiful but also serves its intended purpose effectively. I believe in creating designs that not only catch the eye but also solve real problems."
    },
    process: {
      title: "Work Process",
      steps: [
        {
          number: "01",
          title: "Research & Strategy",
          description: "Understanding the problem space and defining clear objectives."
        },
        {
          number: "02",
          title: "Design & Iterate",
          description: "Creating solutions and refining through feedback."
        },
        {
          number: "03",
          title: "Deliver & Support",
          description: "Implementing solutions and ensuring long-term success."
        }
      ]
    }
  };

  const pages = {
    home: {
      sections: [
        {
          id: 'about',
          label: 'About',
          icon: IconUser,
          data: aboutData
        },
        {
          id: 'experience',
          label: 'Experience',
          icon: IconBriefcase,
          data: workExperience
        }
      ]
    },
    'recent-works': {
      sections: [
        {
          id: 'projects',
          label: 'Projects',
          icon: IconFolder,
          data: sampleProjects,
          noFrame: true
        }
      ]
    }
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [hiddenSections, setHiddenSections] = useState({});
  const [lockedSections, setLockedSections] = useState({});

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Reset canvas position with animation
    canvasRef.current?.resetPosition();
  };

  const socialLinks = [
    { id: 'github', label: 'GitHub', url: 'https://github.com/yourusername' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { id: 'twitter', label: 'Twitter', url: 'https://twitter.com/yourusername' },
    { id: 'dribbble', label: 'Dribbble', url: 'https://dribbble.com/yourusername' }
  ];

  return (
    <div className="design-app">
      <div className="layers-column">
        {showLayers && (
          <>
            <PagesPanel
              currentPage={currentPage}
              onPageSelect={handlePageChange}
            />
            <LayersPanel 
              sections={pages[currentPage].sections}
              selectedSection={selectedFrame?.id}
              onSectionSelect={handleFrameSelect}
              onVisibilityChange={(id, isHidden) => setHiddenSections(prev => ({ ...prev, [id]: isHidden }))}
              onLockChange={(id, isLocked) => setLockedSections(prev => ({ ...prev, [id]: isLocked }))}
              hiddenSections={hiddenSections}
              lockedSections={lockedSections}
            />
          </>
        )}
      </div>

      <div className="main-column">
        <TopNav 
          currentSection={currentPage === 'home' ? 'Home' : 'Recent Works'}
          onNavigate={handlePageChange}
          zoom={zoom}
          onZoomChange={setZoom}
        />
        <Canvas 
          ref={canvasRef}
          selectedTool={selectedTool}
          sections={pages[currentPage].sections}
          customPositions={customPositions}
          frameWidth={getFrameDimensions(currentPage).width}
          frameHeight={getFrameDimensions(currentPage).height}
          frameGap={FRAME_GAP}
          zoom={zoom}
          onZoomChange={setZoom}
          selectedFrame={selectedFrame}
          onFrameSelect={setSelectedFrame}
          currentPage={currentPage}
          onProjectSelect={setSelectedProject}
          hiddenSections={hiddenSections}
          backgroundColor={canvasColor}
        />
      </div>

      <div className="properties-column">
        <PropertiesPanel 
          selectedFrame={selectedFrame}
          onFrameUpdate={handleFrameUpdate}
          canvasColor={canvasColor}
          onCanvasColorChange={handleCanvasColorChange}
          socialLinks={socialLinks}
        />
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div className="tools-column">
        <ToolsPanel 
          selectedTool={selectedTool} 
          onToolSelect={handleToolSelect}
          showLayers={showLayers}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </div>
    </div>
  );
};

export default App;
