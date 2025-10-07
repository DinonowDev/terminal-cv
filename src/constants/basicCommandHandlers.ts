/**
 * Basic Command Handlers Utility
 * 
 * This file contains basic command handler functions like help, about, contact, etc.
 * These are the core commands that don't require complex data processing.
 */

// ============================================================================
// IMPORTS - Data
// ============================================================================
import { contactInfo, resumeInfo } from '../data/portfolioData';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * History function type for adding items to console history
 */
type AddToHistoryFunction = (type: 'input' | 'output', content: string) => void;

// ============================================================================
// BASIC COMMAND HANDLERS
// ============================================================================

/**
 * Shows the help command with all available commands organized by category
 * @param addToHistory - Function to add items to console history
 */
export const showHelp = (addToHistory: AddToHistoryFunction) => {
  const helpText = `
Available Commands:
  help          - Show this help message
  about         - About AmirHossein Rezaei
  experience    - Work experience and skills
  projects      - Featured projects
  games         - Play terminal games
  contact       - Contact information
  resume        - Download resume
  settings      - Terminal settings and themes
  clear         - Clear the terminal
  exit          - Close the terminal

Type any command to get started!
  `.trim();
  addToHistory('output', helpText);
};

/**
 * Shows about information for AmirHossein Rezaei
 * @param addToHistory - Function to add items to console history
 */
export const showAbout = (addToHistory: AddToHistoryFunction) => {
  const aboutText = `
About AmirHossein Rezaei:
=====================================

I am a passionate front-end software engineer specializing in React and Next.js development.
I love creating innovative solutions and solving complex problems through clean, efficient code.

I have worked in various domains with my expertise:
• Financial companies (exchanges, NFT markets, Prop firms)
• CRM systems development
• Infrastructure projects (water treatment, municipal sewage systems)

Specialties:
• Front-End Development (React, Next.js)
• Financial Technology Solutions
• CRM System Development
• Infrastructure Project Integration
• Clean Code & Best Practices
• User-Centered Design

I believe in creating robust, scalable solutions that make a real impact across different industries.
  `.trim();
  addToHistory('output', aboutText);
};

/**
 * Shows contact information
 * @param addToHistory - Function to add items to console history
 */
export const showContact = (addToHistory: AddToHistoryFunction) => {
  const contactText = `
Contact Information:
=====================================

Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
LinkedIn: ${contactInfo.linkedin}
GitHub: ${contactInfo.github}
Location: ${contactInfo.location}

Feel free to reach out for:
• Job opportunities
• Collaboration
• Technical discussions
• Coffee chats ☕

I'm always interested in connecting with fellow developers!
  `.trim();
  addToHistory('output', contactText);
};

/**
 * Shows resume download information
 * @param addToHistory - Function to add items to console history
 */
export const showResume = (addToHistory: AddToHistoryFunction) => {
  const resumeText = `
Resume Download:
=====================================

📄 ${resumeInfo.filename} (${resumeInfo.size})
Last updated: ${resumeInfo.lastUpdated}

The resume includes:
${resumeInfo.includes.map(item => `• ${item}`).join('\n')}

🔗 Click here to download: ${resumeInfo.downloadUrl}
  `.trim();
  addToHistory('output', resumeText);
};
