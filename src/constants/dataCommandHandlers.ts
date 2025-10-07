/**
 * Data Command Handlers Utility
 * 
 * This file contains command handler functions that work with portfolio data
 * including experiences, projects, games, and settings.
 */

// ============================================================================
// IMPORTS - Data
// ============================================================================
import { experiences, projects, games, themes, colors } from '../data/portfolioData';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * History function type for adding items to console history
 */
type AddToHistoryFunction = (type: 'input' | 'output', content: string) => void;

// ============================================================================
// EXPERIENCE COMMAND HANDLERS
// ============================================================================

/**
 * Shows experience summary with all available experience files
 * @param addToHistory - Function to add items to console history
 */
export const showExperience = (addToHistory: AddToHistoryFunction) => {
  const experienceText = `
Professional Experience Summary:
=====================================

📁 Available Experience Files:
${experiences.map((exp, index) => 
  `  [${index + 1}] ${exp.id}.txt           - ${exp.company} | ${exp.position} (${exp.period})`
).join('\n')}

💡 Usage:
${experiences.map(exp => 
  `  open ${exp.id}             - View full details for ${exp.company}`
).join('\n')}

Use Tab to navigate between options!
  `.trim();
  addToHistory('output', experienceText);
};

/**
 * Shows detailed experience information
 * @param experience - The experience object to display
 * @param addToHistory - Function to add items to console history
 */
export const showExperienceDetails = (experience: typeof experiences[0], addToHistory: AddToHistoryFunction) => {
  const experienceText = `
${experience.company} | ${experience.location}
${experience.position} (${experience.period})
=====================================

Technologies: ${experience.technologies.join(', ')}

${experience.description}

${experience.responsibilities ? `Key Responsibilities:
${experience.responsibilities.map(resp => `• ${resp}`).join('\n')}

` : ''}Key Achievements:
${experience.achievements.map(achievement => `• ${achievement}`).join('\n')}
  `.trim();
  addToHistory('output', experienceText);
};

// ============================================================================
// PROJECT COMMAND HANDLERS
// ============================================================================

/**
 * Shows projects summary with all available project files
 * @param addToHistory - Function to add items to console history
 */
export const showProjects = (addToHistory: AddToHistoryFunction) => {
  const projectsText = `
Featured Projects Summary:
=====================================

📁 Available Project Files:
${projects.map((project, index) => 
  `  [${index + 1}] ${project.id}.txt         - ${project.name} | ${project.type} (${project.period})`
).join('\n')}

💡 Usage:
${projects.map(project => 
  `  open ${project.id}          - View full details for ${project.name}`
).join('\n')}

Use Tab to navigate between options!
  `.trim();
  addToHistory('output', projectsText);
};

/**
 * Shows detailed project information
 * @param project - The project object to display
 * @param addToHistory - Function to add items to console history
 */
export const showProjectDetails = (project: typeof projects[0], addToHistory: AddToHistoryFunction) => {
  const projectText = `
${project.name} | ${project.location}
${project.type} (${project.period})
=====================================

Technologies: ${project.technologies.join(', ')}

${project.description}

Key Contributions:
${project.contributions.map(contribution => `• ${contribution}`).join('\n')}

Project Type: ${project.type}
  `.trim();
  addToHistory('output', projectText);
};

// ============================================================================
// GAME COMMAND HANDLERS
// ============================================================================

/**
 * Shows games menu with all available games
 * @param addToHistory - Function to add items to console history
 */
export const showGames = (addToHistory: AddToHistoryFunction) => {
  const gamesText = `
🎮 Terminal Games Collection:
=====================================

Use Arrow Keys to navigate and Enter to select:

${games.map(game => `  > ${game.name.padEnd(15)} - ${game.description}`).join('\n')}

🎯 Navigation:
  ↑/↓ Arrow Keys        - Navigate between games
  Enter                 - Select and play game
  Ctrl+C                - Exit games menu

Ready to play? Use arrow keys to select a game!
  `.trim();
  addToHistory('output', gamesText);
};

/**
 * Shows game details and starts the game
 * @param game - The game object to display
 * @param addToHistory - Function to add items to console history
 */
export const showGameDetails = (game: typeof games[0], addToHistory: AddToHistoryFunction) => {
  const gameText = `
🐍 ${game.description} Selected
=====================================

Starting ${game.description}...

Game will be implemented soon!
  `.trim();
  addToHistory('output', gameText);
};

// ============================================================================
// SETTINGS COMMAND HANDLERS
// ============================================================================

/**
 * Shows settings and theme options
 * @param addToHistory - Function to add items to console history
 */
export const showSettings = (addToHistory: AddToHistoryFunction) => {
  const settingsText = `
Terminal Settings & Themes:
=====================================

🎨 Available Themes:
${themes.map(theme => `  theme ${theme.id.padEnd(10)} - Switch to ${theme.name.toLowerCase()} theme`).join('\n')}

🔧 Color Customization:
  color text <color>     - Change text color
  color bg <color>       - Change background color
  color prompt <color>   - Change prompt color

📋 Available Colors:
  ${colors.map(c => c.name).join(', ')}

💡 Examples:
  theme dark
  color text green
  color bg black
  color prompt cyan

⚙️ Other Settings:
  font size <number>     - Change font size (12-24)
  opacity <number>       - Change opacity (0.1-1.0)
  reset                  - Reset to default settings

Type any setting command to apply changes!
  `.trim();
  addToHistory('output', settingsText);
};
