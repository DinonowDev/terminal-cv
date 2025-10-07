/**
 * Command System Utility
 * 
 * This utility provides a dynamic command system for the console interface.
 * It manages command registration, execution, and categorization.
 * All commands are data-driven and easily extensible.
 */

// ============================================================================
// IMPORTS - Data
// ============================================================================
import { experiences, projects, games } from '../data/portfolioData';

// ============================================================================
// IMPORTS - Handlers
// ============================================================================
import {
  showHelp,
  showAbout,
  showContact,
  showResume
} from '../constants/basicCommandHandlers';

import {
  showExperience,
  showExperienceDetails,
  showProjects,
  showProjectDetails,
  showGames,
  showGameDetails,
  showSettings
} from '../constants/dataCommandHandlers';

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Represents a console command
 * @interface Command
 */
export interface Command {
  /** Command name (what user types) */
  name: string;
  /** Description shown in help */
  description: string;
  /** Function to execute when command is called */
  action: (addToHistory: (type: 'input' | 'output', content: string) => void) => void;
  /** Optional category for grouping commands */
  category?: string;
  /** Optional aliases for the command */
  aliases?: string[];
}

// ============================================================================
// COMMAND SYSTEM CLASS
// ============================================================================

/**
 * CommandSystem Class
 * 
 * Manages all console commands with dynamic registration and execution.
 * Supports command categories, aliases, and data-driven content generation.
 */
export class CommandSystem {
  // ============================================================================
  // PRIVATE PROPERTIES
  // ============================================================================
  
  /** Map of all registered commands by name */
  private commands: Map<string, Command> = new Map();
  /** Map of commands grouped by category */
  private categories: Map<string, Command[]> = new Map();

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================

  /**
   * Creates a new CommandSystem instance and initializes all commands
   */
  constructor() {
    this.initializeCommands();
  }

  // ============================================================================
  // COMMAND INITIALIZATION
  // ============================================================================

  /**
   * Initializes all available commands including basic, dynamic, and data-driven commands
   * This method sets up the complete command system with all portfolio commands
   */
  private initializeCommands() {
    // ============================================================================
    // BASIC COMMANDS
    // ============================================================================
    
    this.addCommand({
      name: 'help',
      description: 'Show available commands',
      category: 'basic',
      action: showHelp
    });

    this.addCommand({
      name: 'about',
      description: 'About AmirHossein Rezaei',
      category: 'info',
      action: showAbout
    });

    this.addCommand({
      name: 'experience',
      description: 'Work experience and career',
      category: 'info',
      action: showExperience
    });

    this.addCommand({
      name: 'projects',
      description: 'Featured projects',
      category: 'info',
      action: showProjects
    });

    this.addCommand({
      name: 'games',
      description: 'Play terminal games',
      category: 'games',
      action: showGames
    });

    this.addCommand({
      name: 'contact',
      description: 'Contact information',
      category: 'info',
      action: showContact
    });

    this.addCommand({
      name: 'resume',
      description: 'Download resume',
      category: 'info',
      action: showResume
    });

    this.addCommand({
      name: 'settings',
      description: 'Terminal settings and themes',
      category: 'settings',
      action: showSettings
    });

    this.addCommand({
      name: 'clear',
      description: 'Clear the terminal',
      category: 'basic',
      action: () => {
        // This will be handled by the console component
      }
    });

    this.addCommand({
      name: 'exit',
      description: 'Close the terminal',
      category: 'basic',
      action: (addToHistory) => {
        addToHistory('output', 'Goodbye! Thanks for visiting my portfolio.');
      }
    });

    // ============================================================================
    // DYNAMIC EXPERIENCE COMMANDS
    // ============================================================================
    
    experiences.forEach(exp => {
      this.addCommand({
        name: exp.id,
        description: `${exp.company} experience details`,
        category: 'experience',
        action: (addToHistory) => showExperienceDetails(exp, addToHistory)
      });
    });

    // ============================================================================
    // DYNAMIC PROJECT COMMANDS
    // ============================================================================
    
    projects.forEach(project => {
      this.addCommand({
        name: project.id,
        description: `${project.name} project details`,
        category: 'project',
        action: (addToHistory) => showProjectDetails(project, addToHistory)
      });
    });

    // ============================================================================
    // DYNAMIC GAME COMMANDS
    // ============================================================================
    
    games.forEach(game => {
      this.addCommand({
        name: game.id,
        description: game.description,
        category: 'game',
        action: (addToHistory) => showGameDetails(game, addToHistory)
      });
    });
  }

  // ============================================================================
  // COMMAND MANAGEMENT
  // ============================================================================

  /**
   * Adds a command to the system
   * @param command - The command to add
   */
  private addCommand(command: Command) {
    this.commands.set(command.name, command);
    
    if (command.category) {
      if (!this.categories.has(command.category)) {
        this.categories.set(command.category, []);
      }
      this.categories.get(command.category)!.push(command);
    }

    // Add aliases
    if (command.aliases) {
      command.aliases.forEach(alias => {
        this.commands.set(alias, command);
      });
    }
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  /**
   * Gets a command by name
   * @param name - The name of the command to get
   * @returns The command or undefined if not found
   */
  public getCommand(name: string): Command | undefined {
    return this.commands.get(name.toLowerCase());
  }

  /**
   * Gets all registered commands
   * @returns Array of all commands
   */
  public getAllCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  /**
   * Gets commands by category
   * @param category - The category to get commands for
   * @returns Array of commands in the category
   */
  public getCommandsByCategory(category: string): Command[] {
    return this.categories.get(category) || [];
  }

  /**
   * Gets all available categories
   * @returns Array of category names
   */
  public getCategories(): string[] {
    return Array.from(this.categories.keys());
  }
}