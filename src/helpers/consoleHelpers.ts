/**
 * Console Helper Utilities
 * 
 * This file contains utility functions for console operations including
 * command execution, history management, and keyboard navigation.
 */

import { AddToHistoryFunction, HistoryItem } from '../types/console';

// ============================================================================
// COMMAND EXECUTION UTILITIES
// ============================================================================

/**
 * Executes a command and handles different command types
 * @param command - The command string to execute
 * @param commandSystem - The command system instance
 * @param addToHistory - Function to add items to history
 * @param setIsGamesMode - Function to set games mode state
 * @param updateGamesDisplay - Function to update games display
 * @param handleThemeChange - Function to handle theme changes
 * @param handleColorChange - Function to handle color changes
 * @param handleFontSizeChange - Function to handle font size changes
 * @param handleOpacityChange - Function to handle opacity changes
 * @param handleReset - Function to handle settings reset
 * @param handleOpenFile - Function to handle file opening
 */
export const executeCommand = (
  command: string,
  commandSystem: { getCommand: (name: string) => { action: (addToHistory: AddToHistoryFunction) => void } | undefined },
  addToHistory: AddToHistoryFunction,
  setIsGamesMode: (value: boolean) => void,
  updateGamesDisplay: () => void,
  handleThemeChange: (theme: string) => void,
  handleColorChange: (type: string, color: string) => void,
  handleFontSizeChange: (size: string) => void,
  handleOpacityChange: (opacity: string) => void,
  handleReset: () => void,
  handleOpenFile: (fileName: string) => void,
  clearHistory: () => void
) => {
  const cmd = commandSystem.getCommand(command.toLowerCase());
  
  if (cmd) {
    if (command.toLowerCase() === 'games') {
      // First execute the command to add game list to history
      cmd.action(addToHistory);
      // Then set games mode and update display
      setIsGamesMode(true);
      // Wait for state update then show interactive menu
      setTimeout(() => updateGamesDisplay(), 50);
    } else if (command.toLowerCase() === 'clear') {
      clearHistory();
    } else {
      cmd.action(addToHistory);
    }
  } else if (command.toLowerCase().startsWith('theme ')) {
    const theme = command.toLowerCase().split(' ')[1];
    handleThemeChange(theme);
  } else if (command.toLowerCase().startsWith('color ')) {
    const colorParts = command.toLowerCase().split(' ');
    if (colorParts.length >= 3) {
      handleColorChange(colorParts[1], colorParts[2]);
    } else {
      addToHistory('output', 'Usage: color <type> <color>\nTypes: text, bg, prompt\nColors: black, white, red, green, blue, yellow, purple, orange, cyan, magenta');
    }
  } else if (command.toLowerCase().startsWith('font size ')) {
    const size = command.toLowerCase().split(' ')[2];
    handleFontSizeChange(size);
  } else if (command.toLowerCase().startsWith('opacity ')) {
    const opacity = command.toLowerCase().split(' ')[1];
    handleOpacityChange(opacity);
  } else if (command.toLowerCase() === 'reset') {
    handleReset();
  } else if (command.toLowerCase().startsWith('open ')) {
    const fileName = command.toLowerCase().split(' ')[1];
    handleOpenFile(fileName);
  } else {
    addToHistory('output', `Command not found: ${command}. Type 'help' for available commands.`);
  }
};

// ============================================================================
// HISTORY MANAGEMENT UTILITIES
// ============================================================================

/**
 * Adds an item to the console history
 * @param type - The type of history item (input or output)
 * @param content - The content to add
 * @param setHistory - Function to update history state
 */
export const addToHistory = (
  type: 'input' | 'output',
  content: string,
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>
) => {
  setHistory(prev => [...prev, { type, content }]);
};

/**
 * Clears the console history
 * @param setHistory - Function to update history state
 */
export const clearHistory = (
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>
) => {
  setHistory([]);
};

// ============================================================================
// KEYBOARD NAVIGATION UTILITIES
// ============================================================================

/**
 * Handles arrow up navigation for command history
 * @param commandHistory - Array of previous commands
 * @param historyIndex - Current history index
 * @param setHistoryIndex - Function to set history index
 * @param setInput - Function to set input value
 */
export const handleArrowUp = (
  commandHistory: string[],
  historyIndex: number,
  setHistoryIndex: (index: number) => void,
  setInput: (value: string) => void
) => {
  if (commandHistory.length === 0) return;
  
  let newIndex = historyIndex;
  if (historyIndex === -1) {
    newIndex = commandHistory.length - 1;
  } else if (historyIndex > 0) {
    newIndex = historyIndex - 1;
  }
  
  setHistoryIndex(newIndex);
  setInput(commandHistory[newIndex]);
};

/**
 * Handles arrow down navigation for command history
 * @param commandHistory - Array of previous commands
 * @param historyIndex - Current history index
 * @param setHistoryIndex - Function to set history index
 * @param setInput - Function to set input value
 */
export const handleArrowDown = (
  commandHistory: string[],
  historyIndex: number,
  setHistoryIndex: (index: number) => void,
  setInput: (value: string) => void
) => {
  if (commandHistory.length === 0) return;
  
  let newIndex = historyIndex;
  if (historyIndex < commandHistory.length - 1) {
    newIndex = historyIndex + 1;
  } else {
    newIndex = -1;
    setInput('');
    return;
  }
  
  setHistoryIndex(newIndex);
  setInput(commandHistory[newIndex]);
};

// ============================================================================
// TAB COMPLETION UTILITIES
// ============================================================================

/**
 * Handles tab completion for file names
 * @param input - Current input value
 * @param tabIndex - Current tab index
 * @param setInput - Function to set input value
 * @param setTabIndex - Function to set tab index
 * @param allFiles - Array of all available files
 */
export const handleTabCompletion = (
  input: string,
  tabIndex: number,
  setInput: (value: string) => void,
  setTabIndex: (index: number) => void,
  allFiles: string[]
) => {
  if (input.startsWith('open ')) {
    const currentInput = input.substring(5).trim();
    
    if (currentInput === '') {
      // If no file name typed, cycle through all files
      const nextFile = allFiles[tabIndex];
      setInput(`open ${nextFile}`);
      setTabIndex((tabIndex + 1) % allFiles.length);
    } else {
      // If partial file name typed, find matching files
      const matchingFiles = allFiles.filter(file => 
        file.startsWith(currentInput)
      );
      
      if (matchingFiles.length > 0) {
        const nextFile = matchingFiles[tabIndex % matchingFiles.length];
        setInput(`open ${nextFile}`);
        setTabIndex((tabIndex + 1) % matchingFiles.length);
      }
    }
  }
};

// ============================================================================
// SCROLL UTILITIES
// ============================================================================

/**
 * Scrolls the console to the bottom
 * @param consoleRef - Reference to the console element
 */
export const scrollToBottom = (consoleRef: React.RefObject<HTMLDivElement | null>) => {
  if (consoleRef.current) {
    consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }
};

/**
 * Scrolls to the game element
 * @param consoleRef - Reference to the console element
 */
export const scrollToGame = (consoleRef: React.RefObject<HTMLDivElement | null>) => {
  if (consoleRef.current) {
    const gameElement = consoleRef.current.querySelector('.snake-game');
    if (gameElement) {
      gameElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
};
