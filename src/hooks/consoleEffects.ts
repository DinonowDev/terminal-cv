/**
 * Console Effects Utilities
 * 
 * This file contains utility functions for console effects including
 * scrolling, focusing, and global event handling.
 */

import { useEffect } from 'react';
import { scrollToBottom } from '../helpers/consoleHelpers';
import { handleGlobalKeyDown, handleContextMenu } from '../helpers/keyboardHandlers';

// ============================================================================
// SCROLL EFFECTS
// ============================================================================

/**
 * Creates an effect that scrolls to bottom when history changes
 * @param consoleRef - Reference to the console element
 * @param history - The history array
 */
export const useScrollToBottom = (
  consoleRef: React.RefObject<HTMLDivElement | null>,
  history: Array<{ type: 'input' | 'output', content: string }>
) => {
  useEffect(() => {
    scrollToBottom(consoleRef);
  }, [history, consoleRef]);
};

/**
 * Creates an effect that focuses input when typing is complete
 * @param inputRef - Reference to the input element
 * @param isTyping - Whether typing animation is active
 */
export const useInputFocus = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  isTyping: boolean
) => {
  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping, inputRef]);
};

/**
 * Creates an effect that automatically focuses input whenever user clicks anywhere
 * @param inputRef - Reference to the input element
 * @param isGamesMode - Whether games mode is active
 * @param isPlayingGame - Whether a game is currently playing
 */
export const useAutoFocus = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  isGamesMode: boolean,
  isPlayingGame: boolean
) => {
  useEffect(() => {
    const handleFocus = () => {
      // Only auto-focus if not in games mode or playing a game
      if (!isGamesMode && !isPlayingGame && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };

    // Focus on click anywhere in the document
    const handleClick = (e: MouseEvent) => {
      // Don't interfere with text selection in output
      const target = e.target as HTMLElement;
      if (target.tagName !== 'A' && target.tagName !== 'CANVAS') {
        handleFocus();
      }
    };

    // Re-focus when window regains focus
    const handleWindowFocus = () => {
      handleFocus();
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('focus', handleWindowFocus);

    // Initial focus
    handleFocus();

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [inputRef, isGamesMode, isPlayingGame]);
};

/**
 * Creates an effect that starts the typing sequence
 * @param setCurrentStep - Function to set current step
 */
export const useTypingSequence = (
  setCurrentStep: (step: number) => void
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [setCurrentStep]);
};

// ============================================================================
// GLOBAL EVENT EFFECTS
// ============================================================================

/**
 * Creates an effect that handles global keyboard events and games mode
 * @param isGamesMode - Whether games mode is active
 * @param isPlayingGame - Whether a game is currently playing
 * @param onGamesUp - Callback for games navigation up
 * @param onGamesDown - Callback for games navigation down
 * @param onGamesSelect - Callback for games selection
 * @param onGamesExit - Callback for games exit
 */
export const useGlobalKeyboardEvents = (
  isGamesMode: boolean,
  isPlayingGame: boolean,
  onGamesUp: () => void,
  onGamesDown: () => void,
  onGamesSelect: () => void,
  onGamesExit: () => void
) => {
  useEffect(() => {
    const handleGlobalKeyDownWrapper = (e: KeyboardEvent) => {
      handleGlobalKeyDown(
        e,
        isGamesMode,
        isPlayingGame,
        onGamesUp,
        onGamesDown,
        onGamesSelect,
        onGamesExit
      );
    };

    document.addEventListener('keydown', handleGlobalKeyDownWrapper);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDownWrapper);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isGamesMode, isPlayingGame, onGamesUp, onGamesDown, onGamesSelect, onGamesExit]);
};
