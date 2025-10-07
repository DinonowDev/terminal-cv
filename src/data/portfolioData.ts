/**
 * Portfolio Data
 * 
 * This file contains all the portfolio data including experiences, projects,
 * games, themes, and contact information. All data is structured and
 * easily maintainable.
 */

// ============================================================================
// IMPORTS - Types
// ============================================================================
import { Experience, Project, Game, Theme, Color } from '../types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'elegant-hoopoe',
    company: 'Elegant Hoopoe',
    position: 'Front-end Developer',
    period: '2024 Jul - Present',
    location: 'Hybrid | Tehran-Dubai',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'i18n', 'SASS', 'Tailwind', 'Ant-design', 'Axios', 'Zustand', 'Storybook', 'React Query', 'React Hook Form', 'Cypress', 'Zod', 'Orval', 'Ionic', 'Capacitor'],
    description: 'Initially developed an MVP for a CRM system to manage clinic operations (customers, payments, appointments, WebSocket-based contracts). Successfully expanded the MVP into a full ERP system, adding features like medication registration, pharmacy order management, clinic staff management, and access control.',
    achievements: [
      'Improved page rendering speed by 40% through front-end optimization',
      'Supported 25% more users with the same infrastructure resources',
      'Increased WebSocket & live system performance by 20%, enhancing real-time communication between clinics and customers',
      'Implemented dynamic forms for customized contracts, delivering an improved user experience (UX)'
    ],
    responsibilities: [
      'Led front-end development for the first ERP version',
      'Implemented access and permissions management',
      'Developed appointment scheduling and WebSocket-based contract management',
      'Implemented payment and financial modules',
      'Built medication management system aligned with UAE Ministry of Health requirements',
      'Documented project structure, infrastructure, and development standards',
      'Developed a UI Kit based on product design',
      'Managed and mentored a team of 5+ engineers'
    ]
  },
  {
    id: 'z-prime',
    company: 'Z Prime',
    position: 'Front-end Developer',
    period: '2025 Jul - Present',
    location: 'London (Part-time & Remote)',
    technologies: ['React.js', 'TypeScript', 'Shadcn', 'Axios', 'Zustand', 'ECharts', 'Orval'],
    description: 'Working on frontend development of an AI-powered platform to optimize industrial systems (wastewater treatment, digital twins, complex infrastructures). In MVP stage, platform focuses on an intelligent dashboard collecting and processing real-time data from industrial sensors, visualizing through high-performance interactive charts for smart decision-making.',
    achievements: [
      'Handling and visualizing thousands of real-time data points simultaneously while maintaining performance, responsiveness, and scalability',
      'Advanced data visualization, efficient state management, and optimized rendering strategies'
    ]
  },
  {
    id: 'bitcial',
    company: 'Bitcial Crypto Currency Exchange',
    position: 'Front-end Developer',
    period: '2023 Aug - 2024 March',
    location: 'Tehran',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'i18n', 'SASS', 'Tailwind', 'Ant-design', 'Axios', 'Zustand', 'Chart.js', 'React Query', 'React Hook Form', 'Cypress', 'Zod', 'Million.js'],
    description: 'Performance Testing with k6: Meeting service-level objectives (SLOs) for 99% successful requests and low latency. Dynamic Pages with React and Next.js: Balancing server-side rendering (SSR) for SEO and client-side rendering (CSR) for performance.',
    achievements: [
      'Integrated real-time data feeds (cryptocurrency prices) and optimized React components (lazy loading, code splitting)',
      'Created a pipeline for project and automated CI/CD processes for deployment by passing configured linters',
      'Designed and improved performance of Trade and Market pages in user dashboard for quick real-time transactions',
      'Documented project structure and infrastructure in Confluence with API status from back-end'
    ]
  },
  {
    id: 'sgb-trading',
    company: 'SGB Trading',
    position: 'Front-end Developer',
    period: '2022 Jan - 2023 Jan',
    location: 'Remote | Dubai',
    technologies: ['React.js', 'TypeScript', 'Ant-design', 'Axios', 'Redux', 'Chart.js', 'SASS'],
    description: 'Designed and implemented a user panel and an admin panel using Next.js and React.js, creating intuitive UX and streamlining internal administration workflows.',
    achievements: [
      'Built and integrated financial system, handling $300K+ in monthly transaction volume and serving over 60,000 active users with high reliability and security',
      'Integrated data visualization tools (charting libraries) for real-time analysis and visual representation of trading data, improving decision-making and increasing user engagement'
    ]
  },
  {
    id: 'barcode',
    company: 'Barcode Software Agency',
    position: 'Front-end Developer',
    period: '2021 Mar - 2023 Jan',
    location: 'Tehran',
    technologies: ['React.js', 'TypeScript', 'Ant-design'],
    description: 'Received and implemented website design projects from employers using modern technologies.',
    achievements: [
      'Played a role in the development of projects such as Gamdo school management system, Fundino prop firm, and a seed fund fundraising website'
    ]
  }
];

export const projects: Project[] = [
  {
    id: 'scrubbers',
    name: 'Scrubbers Project',
    period: '2024 Jan - 2024 June',
    location: 'REMOTE | Los Angeles',
    type: 'Part Time - REMOTE',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'i18n', 'SASS', 'Tailwind', 'Ant-design', 'Axios', 'Zustand', 'Storybook'],
    description: 'Designing dynamic pages that are automatically created using data returned from the Back-end.',
    contributions: [
      'Wrapping and customizing Ant-design library components to be compatible with the project, designing the system design, and using user interface testing tools like Storybook',
      'Using libraries like million.js to increase project speed by up to 70%'
    ]
  },
  {
    id: 'cypunks',
    name: 'Cypunks NFT Collection',
    period: '2022 - 2023',
    location: 'REMOTE',
    type: 'NFT Collection Platform',
    technologies: ['React.js', 'TypeScript', 'Next.js', 'Solidity'],
    description: 'Designing a smart contract along with a user interface on the website to mint users by making a transaction.',
    contributions: [
      'Designed a smart contract along with a user interface on the website to mint users by making a transaction'
    ]
  },
  {
    id: 'steach',
    name: 'Steach.org',
    period: '2024 Jan - Oct',
    location: 'Tehran',
    type: 'Part-time',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'i18n', 'SASS', 'TailwindCSS', 'Ant-design', 'Axios', 'Zustand', 'Jest'],
    description: 'Development of a new platform to host training courses at different levels, including admin, professor, student, and support dashboards.',
    contributions: [
      'Refactoring old JavaScript codes to TypeScript for the former project',
      'Achieving 60% performance improvement in the old project, solving user problems, and developing a UI kit for joint internal projects'
    ]
  },
  {
    id: 'coinoverse',
    name: 'Coinoverse (Exchange and broker)',
    period: '2024 June - 2024 Oct',
    location: 'London - Tehran',
    type: 'Part Time - REMOTE',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'i18n', 'SASS', 'Tailwind', 'Ant-design', 'Axios', 'Jutai', 'Playwright'],
    description: 'Responsible for rolling out a new GUI version and making the platform multilingual. Entrusted with improving system performance and scalability due to prior experience in the crypto exchange domain.',
    contributions: [
      'Optimized React components to prevent unnecessary re-renders, reducing client-side load times by 30% and significantly improving overall site speed',
      'Designed and implemented a custom design system, eliminating duplicate components and packaging it as a private npm library for faster and more consistent development',
      'Migrated certain WebSocket requests to service workers, improving data transfer efficiency by 25% for a faster and smoother real-time trading experience',
      'Drove the multilingual rollout, ensuring the platform could effectively serve a broader international user base'
    ]
  }
];

export const games: Game[] = [
  {
    id: 'snake',
    name: 'snake',
    description: 'Classic Snake Game',
    component: 'SnakeGame'
  }
];

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    colors: { bg: '#ffffff', text: '#000000', prompt: '#0066cc' }
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: { bg: '#000000', text: '#ffffff', prompt: '#00ff00' }
  },
  {
    id: 'green',
    name: 'Green',
    colors: { bg: '#000000', text: '#00ff00', prompt: '#00ff00' }
  },
  {
    id: 'blue',
    name: 'Blue',
    colors: { bg: '#000011', text: '#0088ff', prompt: '#0088ff' }
  },
  {
    id: 'purple',
    name: 'Purple',
    colors: { bg: '#110011', text: '#cc00cc', prompt: '#cc00cc' }
  },
  {
    id: 'red',
    name: 'Red',
    colors: { bg: '#110000', text: '#ff4444', prompt: '#ff4444' }
  },
  {
    id: 'orange',
    name: 'Orange',
    colors: { bg: '#1a0f00', text: '#ffaa33', prompt: '#ffaa33' }
  },
  {
    id: 'cyan',
    name: 'Cyan',
    colors: { bg: '#001a1a', text: '#00ffff', prompt: '#00ffff' }
  }
];

export const colors: Color[] = [
  { name: 'black', value: '#000000' },
  { name: 'white', value: '#ffffff' },
  { name: 'red', value: '#ff0000' },
  { name: 'green', value: '#00ff00' },
  { name: 'blue', value: '#0000ff' },
  { name: 'yellow', value: '#ffff00' },
  { name: 'purple', value: '#800080' },
  { name: 'orange', value: '#ffa500' },
  { name: 'cyan', value: '#00ffff' },
  { name: 'magenta', value: '#ff00ff' }
];

export const contactInfo = {
  email: 'dinonowdev@gmail.com',
  phone: '+98 990 559 2340',
  linkedin: 'https://www.linkedin.com/in/dinonow/',
  github: 'https://github.com/DinonowDev',
  location: 'Tehran, Iran'
};

export const resumeInfo = {
  filename: 'Resume.pdf',
  size: '170 KB',
  lastUpdated: 'January 2025',
  downloadUrl: 'https://drive.google.com/file/d/1Jktcd6nJ77K9WJhffLkhxFisZfuiTP97/view?usp=sharing',
  includes: [
    'Professional summary',
    'Work experience',
    'Education',
    'Skills and certifications',
    'Projects and achievements',
    'Contact information'
  ]
};
