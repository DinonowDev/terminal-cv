/**
 * Keyboard Handler Utilities
 * 
 * This file contains utility functions for handling keyboard events
 * including navigation, shortcuts, and game controls.
 */

import { ReactKeyboardEvent } from '../types/console';

// ============================================================================
// KEYBOARD EVENT UTILITIES
// ============================================================================

/**
 * Checks if the event is a browser console shortcut that should be disabled
 * @param e - The keyboard event
 * @returns True if the event should be prevented
 */
export const isBrowserConsoleShortcut = (e: ReactKeyboardEvent): boolean => {
  return e.key === 'F12' || 
         (e.ctrlKey && e.shiftKey && e.key === 'I') ||
         (e.ctrlKey && e.shiftKey && e.key === 'J') ||
         (e.ctrlKey && e.key === 'U');
};

/**
 * Handles the main key press event for command execution
 * @param e - The keyboard event
 * @param input - Current input value
 * @param isGamesMode - Whether games mode is active
 * @param onCommandExecute - Callback for command execution
 * @param onInputClear - Callback to clear input
 * @param onTabIndexReset - Callback to reset tab index
 */
export const handleKeyPress = (
  e: ReactKeyboardEvent,
  input: string,
  isGamesMode: boolean,
  onCommandExecute: (command: string) => void,
  onInputClear: () => void,
  onTabIndexReset: () => void
) => {
  if (e.key === 'Enter' && input.trim() && !isGamesMode) {
    onCommandExecute(input.trim());
    onInputClear();
    onTabIndexReset();
  }
};

/**
 * Handles the main key down event for navigation and shortcuts
 * @param e - The keyboard event
 * @param isGamesMode - Whether games mode is active
 * @param onTabCompletion - Callback for tab completion
 * @param onArrowUp - Callback for arrow up
 * @param onArrowDown - Callback for arrow down
 * @param onEnter - Callback for enter key
 * @param onCtrlC - Callback for Ctrl+C
 */
export const handleKeyDown = (
  e: ReactKeyboardEvent,
  isGamesMode: boolean,
  onTabCompletion: () => void,
  onArrowUp: () => void,
  onArrowDown: () => void,
  onEnter: () => void,
  onCtrlC: () => void
) => {
  // Disable browser console shortcuts
  if (isBrowserConsoleShortcut(e)) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // Handle Ctrl+C to exit games mode
  if (e.ctrlKey && e.key === 'c' && isGamesMode) {
    e.preventDefault();
    e.stopPropagation();
    onCtrlC();
    return;
  }

  if (e.key === 'Tab' && !isGamesMode) {
    e.preventDefault();
    e.stopPropagation();
    onTabCompletion();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    onArrowUp();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    onArrowDown();
  } else if (e.key === 'Enter' && isGamesMode) {
    e.preventDefault();
    e.stopPropagation();
    onEnter();
  }
};

/**
 * Handles global keyboard events for games mode and shortcuts
 * @param e - The keyboard event
 * @param isGamesMode - Whether games mode is active
 * @param isPlayingGame - Whether a game is currently playing
 * @param onGamesUp - Callback for games navigation up
 * @param onGamesDown - Callback for games navigation down
 * @param onGamesSelect - Callback for games selection
 * @param onGamesExit - Callback for games exit
 */
export const handleGlobalKeyDown = (
  e: KeyboardEvent,
  isGamesMode: boolean,
  isPlayingGame: boolean,
  onGamesUp: () => void,
  onGamesDown: () => void,
  onGamesSelect: () => void,
  onGamesExit: () => void
) => {
  // Disable browser console shortcuts
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U') ||
      (e.ctrlKey && e.shiftKey && e.key === 'K')) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Disable arrow key scrolling when games are active
  if (isGamesMode || isPlayingGame) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Handle arrow keys and Enter in games mode at document level
  if (isGamesMode) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onGamesUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onGamesDown();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onGamesSelect();
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      onGamesExit();
    }
  }
};

/**
 * Handles context menu prevention
 * @param e - The mouse event
 * @returns False to prevent context menu
 */
export const handleContextMenu = (e: MouseEvent): boolean => {
  e.preventDefault();
  return false;
};
