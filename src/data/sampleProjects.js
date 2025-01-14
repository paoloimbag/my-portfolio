const generateSampleProjects = (count) => {
  const teams = ['Design Team', 'Development Team', 'Marketing Team', 'Product Team'];
  const owners = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Wilson'];
  const projects = [
    {
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and customer insights.',
      role: 'Lead Developer',
      duration: '4 months',
      year: '2024',
      client: 'RetailCo Inc.',
      challenges: [
        'Complex inventory management system integration',
        'Real-time analytics processing',
        'Multi-vendor support requirements'
      ],
      solution: 'Implemented a scalable microservices architecture with real-time data processing using Apache Kafka and Redis for caching. Developed a modular dashboard system that supports multiple vendors while maintaining performance.',
      images: [
        {
          url: '/assets/projects/ecommerce/dashboard.png',
          caption: 'Main dashboard interface'
        },
        {
          url: '/assets/projects/ecommerce/analytics.png',
          caption: 'Analytics visualization'
        }
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
      thumbnail: '/assets/thumbnails/ecommerce.jpg',
      featuredImage: '/assets/featured/ecommerce-hero.jpg',
      preview: '/assets/previews/ecommerce-preview.gif',
      links: {
        demo: 'https://demo.ecommerce-dashboard.com',
        github: 'https://github.com/username/ecommerce-dashboard'
      },
      completedAt: '2024-01-15'
    },
    {
      title: 'Social Media Analytics Platform',
      description: 'An AI-powered analytics platform that helps businesses understand their social media performance and audience engagement.',
      technologies: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL', 'GCP'],
      thumbnail: '/assets/thumbnails/analytics.jpg',
      featuredImage: '/assets/featured/analytics-hero.jpg',
      preview: '/assets/previews/analytics-preview.gif',
      links: {
        demo: 'https://social-analytics-demo.com',
        github: 'https://github.com/username/social-analytics'
      },
      completedAt: '2024-02-01'
    },
    {
      title: 'Design System Library',
      description: 'A comprehensive component library and design system for building consistent and accessible web applications.',
      technologies: ['React', 'Storybook', 'Styled Components', 'Jest', 'Figma'],
      thumbnail: '/assets/thumbnails/design-system.jpg',
      featuredImage: '/assets/featured/design-system-hero.jpg',
      preview: '/assets/previews/design-system-preview.gif',
      links: {
        demo: 'https://design-system-demo.com',
        github: 'https://github.com/username/design-system'
      },
      completedAt: '2024-02-15'
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered platform for generating and optimizing marketing content using advanced language models.',
      technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Prisma', 'Vercel'],
      thumbnail: '/assets/thumbnails/ai-content.jpg',
      featuredImage: '/assets/featured/ai-content-hero.jpg',
      preview: '/assets/previews/ai-content-preview.gif',
      links: {
        demo: 'https://ai-content-demo.com',
        github: 'https://github.com/username/ai-content'
      },
      completedAt: '2024-03-01'
    }
  ];

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1).getTime();
    const end = new Date().getTime();
    return new Date(start + Math.random() * (end - start)).toISOString();
  };

  return Array.from({ length: count }, (_, i) => ({
    id: `proj-${i + 1}`,
    ...projects[i % projects.length],
    thumbnail: null, // Add actual thumbnails if available
    lastModified: getRandomDate(),
    owner: owners[i % owners.length],
    team: teams[i % teams.length]
  }));
};

export const sampleProjects = generateSampleProjects(20); 