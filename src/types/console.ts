/**
 * Console Component Types
 * 
 * This file contains all TypeScript interfaces and types used by the Console component
 * and related utilities. It provides type safety and better code organization.
 */

// ============================================================================
// CORE CONSOLE TYPES
// ============================================================================

/**
 * Represents a command that can be executed in the console
 */
export interface Command {
  name: string;
  description: string;
  action: (addToHistory: (type: 'input' | 'output', content: string) => void) => void;
  category?: string;
  aliases?: string[];
}

/**
 * Props interface for the Console component
 */
export interface ConsoleProps {
  commands: Command[];
}

/**
 * History item structure for console output
 */
export interface HistoryItem {
  type: 'input' | 'output';
  content: string;
}

/**
 * Console state interface for managing component state
 */
export interface ConsoleState {
  input: string;
  history: HistoryItem[];
  isTyping: boolean;
  currentStep: number;
  tabIndex: number;
  commandHistory: string[];
  historyIndex: number;
  isGamesMode: boolean;
  selectedGame: string;
  isPlayingGame: boolean;
}

// ============================================================================
// GAME SELECTION TYPES
// ============================================================================

/**
 * Represents a selectable item in arrow navigation menus
 */
export interface SelectableItem {
  id: string;
  name: string;
  description?: string;
  action?: () => void;
}

/**
 * Configuration for arrow selection menus
 */
export interface ArrowSelectionConfig {
  items: SelectableItem[];
  onSelect: (item: SelectableItem) => void;
  onExit?: () => void;
  title: string;
  instructions: string;
}

// ============================================================================
// THEME SYSTEM TYPES
// ============================================================================

/**
 * Color configuration for themes
 */
export interface ThemeColors {
  bg: string;
  text: string;
  prompt: string;
}

/**
 * Theme configuration structure
 */
export interface ThemeConfig {
  id: string;
  name: string;
  colors: ThemeColors;
}

/**
 * Color definition for theme system
 */
export interface ColorConfig {
  name: string;
  value: string;
}

// ============================================================================
// KEYBOARD EVENT TYPES
// ============================================================================

/**
 * Keyboard event handler types for console navigation
 */
export type KeyboardEventHandler = (e: React.KeyboardEvent) => void;

/**
 * Key press handler for command execution
 */
export type KeyPressHandler = (e: React.KeyboardEvent) => void;

/**
 * Key down handler for navigation and shortcuts
 */
export type KeyDownHandler = (e: React.KeyboardEvent) => void;

/**
 * React keyboard event type for console navigation
 */
export type ReactKeyboardEvent = React.KeyboardEvent;

// ============================================================================
// UTILITY FUNCTION TYPES
// ============================================================================

/**
 * History update function type
 */
export type AddToHistoryFunction = (type: 'input' | 'output', content: string) => void;

/**
 * Scroll handler function type
 */
export type ScrollHandler = () => void;

/**
 * Game exit handler function type
 */
export type GameExitHandler = () => void;
