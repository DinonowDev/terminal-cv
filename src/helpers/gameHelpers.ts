/**
 * Game Helper Utilities
 * 
 * This file contains utility functions for game management including
 * game selection, display updates, and navigation handling.
 */

import { ArrowSelection } from '../utils/arrowSelection';
import { AddToHistoryFunction } from '../types/console';

// ============================================================================
// GAME DISPLAY UTILITIES
// ============================================================================

/**
 * Updates the games display with current selection
 * @param gamesSelection - The arrow selection instance for games
 * @param setHistory - Function to update history state
 */
export const updateGamesDisplay = (
  gamesSelection: ArrowSelection,
  setHistory: React.Dispatch<React.SetStateAction<Array<{ type: 'input' | 'output', content: string }>>>
) => {
  const gamesText = gamesSelection.getDisplayText();
  
  // Update the last output in history
  setHistory(prev => {
    const newHistory = [...prev];
    if (newHistory.length > 0 && newHistory[newHistory.length - 1].type === 'output') {
      newHistory[newHistory.length - 1] = { type: 'output', content: gamesText };
    }
    return newHistory;
  });
};

/**
 * Handles game selection navigation up
 * @param gamesSelection - The arrow selection instance for games
 * @param updateGamesDisplay - Function to update games display
 */
export const handleGamesUp = (
  gamesSelection: ArrowSelection,
  updateGamesDisplay: () => void
) => {
  gamesSelection.moveUp();
  updateGamesDisplay();
};

/**
 * Handles game selection navigation down
 * @param gamesSelection - The arrow selection instance for games
 * @param updateGamesDisplay - Function to update games display
 */
export const handleGamesDown = (
  gamesSelection: ArrowSelection,
  updateGamesDisplay: () => void
) => {
  gamesSelection.moveDown();
  updateGamesDisplay();
};

/**
 * Handles game selection
 * @param gamesSelection - The arrow selection instance for games
 */
export const handleGamesSelect = (gamesSelection: ArrowSelection) => {
  gamesSelection.select();
};

/**
 * Handles game exit
 * @param setIsPlayingGame - Function to set playing game state
 * @param addToHistory - Function to add items to history
 */
export const handleExitGame = (
  setIsPlayingGame: (value: boolean) => void,
  addToHistory: AddToHistoryFunction
) => {
  setIsPlayingGame(false);
  addToHistory('output', 'Game ended. Type any command to continue.');
};

// ============================================================================
// GAME INITIALIZATION UTILITIES
// ============================================================================

/**
 * Creates game items for arrow selection
 * @param games - Array of game data
 * @param setSelectedGame - Function to set selected game
 * @param setIsGamesMode - Function to set games mode
 * @param setIsPlayingGame - Function to set playing game state
 * @param scrollToGame - Function to scroll to game
 * @returns Array of selectable game items
 */
export const createGameItems = (
  games: Array<{ id: string; name: string; description: string }>,
  setSelectedGame: (game: string) => void,
  setIsGamesMode: (value: boolean) => void,
  setIsPlayingGame: (value: boolean) => void,
  scrollToGame: () => void
) => {
  return games.map(game => ({
    id: game.id,
    name: game.name,
    description: game.description,
    action: () => {
      setSelectedGame(game.id);
      setIsGamesMode(false);
      setIsPlayingGame(true);
      setTimeout(() => scrollToGame(), 100);
    }
  }));
};

/**
 * Creates games selection configuration
 * @param gameItems - Array of game items
 * @param setIsGamesMode - Function to set games mode
 * @param addToHistory - Function to add items to history
 * @returns Arrow selection configuration
 */
export const createGamesSelectionConfig = (
  gameItems: Array<{ id: string; name: string; description: string; action?: () => void }>,
  setIsGamesMode: (value: boolean) => void,
  addToHistory: AddToHistoryFunction
) => {
  return {
    items: gameItems,
    onSelect: (item: { id: string; name: string; description?: string; action?: () => void }) => item.action?.(),
    onExit: () => {
      setIsGamesMode(false);
      addToHistory('output', '^C\nExited games menu. Type any command to continue.');
    },
    title: '🎮 Terminal Games Collection:',
    instructions: 'Use Arrow Keys to navigate and Enter to select:'
  };
};
