/**
 * Portfolio Data Types
 * 
 * This file contains all TypeScript interfaces and types used for portfolio data
 * including experiences, projects, games, and contact information.
 */

// ============================================================================
// EXPERIENCE TYPES
// ============================================================================

/**
 * Represents a work experience entry
 */
export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  technologies: string[];
  description: string;
  achievements: string[];
  responsibilities?: string[];
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

/**
 * Represents a project entry
 */
export interface Project {
  id: string;
  name: string;
  period: string;
  location: string;
  type: string;
  technologies: string[];
  description: string;
  contributions: string[];
}

// ============================================================================
// GAME TYPES
// ============================================================================

/**
 * Represents a game entry
 */
export interface Game {
  id: string;
  name: string;
  description: string;
  component?: string;
}

// ============================================================================
// CONTACT TYPES
// ============================================================================

/**
 * Contact information structure
 */
export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

/**
 * Resume information structure
 */
export interface ResumeInfo {
  filename: string;
  size: string;
  lastUpdated: string;
  downloadUrl: string;
  includes: string[];
}

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Theme color configuration
 */
export interface ThemeColors {
  bg: string;
  text: string;
  prompt: string;
}

/**
 * Theme configuration
 */
export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

/**
 * Color definition
 */
export interface Color {
  name: string;
  value: string;
}
