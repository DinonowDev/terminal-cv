/**
 * Console Component
 * 
 * This is the main console component that provides a terminal-like interface
 * for the portfolio. It handles command execution, navigation, and game management.
 */

'use client';

// ============================================================================
// IMPORTS - React Hooks
// ============================================================================
import { useState, useRef, useCallback, useMemo } from 'react';

// ============================================================================
// IMPORTS - Components
// ============================================================================
import ConsoleRender from './ConsoleRender';

// ============================================================================
// IMPORTS - Utils
// ============================================================================
import { CommandSystem } from '../utils/commandSystem';
import { ArrowSelection } from '../utils/arrowSelection';
import { ThemeSystem } from '../utils/themeSystem';
import { games } from '../data/portfolioData';

// ============================================================================
// IMPORTS - Helper Functions
// ============================================================================
import {
  executeCommand,
  addToHistory as addToHistoryUtil,
  handleArrowUp,
  handleArrowDown,
  handleTabCompletion,
  scrollToGame
} from '../helpers/consoleHelpers';
import {
  handleThemeChange,
  handleColorChange,
  handleFontSizeChange,
  handleOpacityChange,
  handleReset
} from '../helpers/themeHelpers';
import {
  updateGamesDisplay,
  handleGamesUp,
  handleGamesDown,
  handleGamesSelect,
  handleExitGame,
  createGameItems,
  createGamesSelectionConfig
} from '../helpers/gameHelpers';
import {
  handleKeyPress,
  handleKeyDown
} from '../helpers/keyboardHandlers';
import {
  useScrollToBottom,
  useInputFocus,
  useTypingSequence,
  useGlobalKeyboardEvents
} from '../hooks/consoleEffects';

// ============================================================================
// IMPORTS - Types
// ============================================================================
import { ConsoleProps, AddToHistoryFunction } from '../types/console';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Console({ commands }: ConsoleProps) {
  // ============================================================================
  // STATE HOOKS
  // ============================================================================
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output', content: string }>>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGamesMode, setIsGamesMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  // ============================================================================
  // REFS
  // ============================================================================
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  const commandSystem = useMemo(() => new CommandSystem(), []);
  const themeSystem = useMemo(() => new ThemeSystem(), []);
  
  // Create dynamic arrow selection for games
  const gamesSelection = useMemo(() => {
    const gameItems = createGameItems(
      games,
      setSelectedGame,
      setIsGamesMode,
      setIsPlayingGame,
      () => scrollToGame(consoleRef)
    );

    const config = createGamesSelectionConfig(
      gameItems,
      setIsGamesMode,
      (type, content) => addToHistoryUtil(type, content, setHistory)
    );

    return new ArrowSelection(config);
  }, []);

  const experienceFiles = useMemo(() => ['elegant-hoopoe', 'z-prime', 'bitcial', 'sgb-trading', 'barcode'], []);
  const projectFiles = useMemo(() => ['scrubbers', 'cypunks', 'steach', 'coinoverse'], []);
  const gameFiles = useMemo(() => games.map(g => g.id), []);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  
  /**
   * Adds an item to the console history
   */
  const addToHistory: AddToHistoryFunction = (type, content) => {
    addToHistoryUtil(type, content, setHistory);
  };

  /**
   * Updates the games display with current selection
   */
  const updateGamesDisplayCallback = useCallback(() => {
    updateGamesDisplay(gamesSelection, setHistory);
  }, [gamesSelection]);

  /**
   * Handles opening files
   */
  const handleOpenFile = (fileName: string) => {
    const allFiles = [...experienceFiles, ...projectFiles, ...gameFiles];
    const fileHandlers: { [key: string]: () => void } = {
      'elegant-hoopoe': () => commands.find(c => c.name === 'elegant-hoopoe')?.action(addToHistory),
      'z-prime': () => commands.find(c => c.name === 'z-prime')?.action(addToHistory),
      'bitcial': () => commands.find(c => c.name === 'bitcial')?.action(addToHistory),
      'sgb-trading': () => commands.find(c => c.name === 'sgb-trading')?.action(addToHistory),
      'barcode': () => commands.find(c => c.name === 'barcode')?.action(addToHistory),
      'scrubbers': () => commands.find(c => c.name === 'scrubbers')?.action(addToHistory),
      'cypunks': () => commands.find(c => c.name === 'cypunks')?.action(addToHistory),
      'steach': () => commands.find(c => c.name === 'steach')?.action(addToHistory),
      'coinoverse': () => commands.find(c => c.name === 'coinoverse')?.action(addToHistory),
      'snake': () => commands.find(c => c.name === 'snake')?.action(addToHistory)
    };

    if (fileHandlers[fileName]) {
      fileHandlers[fileName]();
    } else {
      addToHistory('output', `File not found: ${fileName}\nAvailable files: ${allFiles.join(', ')}`);
    }
  };

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handles key press events for command execution
   */
  const handleKeyPressWrapper = (e: React.KeyboardEvent) => {
    handleKeyPress(
      e,
      input,
      isGamesMode,
      (command) => {
        addToHistory('input', command);
        executeCommand(
          command,
          commandSystem,
          addToHistory,
          setIsGamesMode,
          updateGamesDisplayCallback,
          (theme) => handleThemeChange(theme, themeSystem, addToHistory),
          (type, color) => handleColorChange(type, color, themeSystem, addToHistory),
          (size) => handleFontSizeChange(size, themeSystem, addToHistory),
          (opacity) => handleOpacityChange(opacity, themeSystem, addToHistory),
          () => handleReset(themeSystem, addToHistory),
          handleOpenFile
        );
        
        // Add command to history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
      },
      () => setInput(''),
      () => setTabIndex(0)
    );
  };

  /**
   * Handles key down events for navigation and shortcuts
   */
  const handleKeyDownWrapper = (e: React.KeyboardEvent) => {
    handleKeyDown(
      e,
      isGamesMode,
      () => handleTabCompletion(input, tabIndex, setInput, setTabIndex, [...experienceFiles, ...projectFiles, ...gameFiles]),
      () => {
        if (isGamesMode) {
          handleGamesUp(gamesSelection, updateGamesDisplayCallback);
        } else {
          handleArrowUp(commandHistory, historyIndex, setHistoryIndex, setInput);
        }
      },
      () => {
        if (isGamesMode) {
          handleGamesDown(gamesSelection, updateGamesDisplayCallback);
        } else {
          handleArrowDown(commandHistory, historyIndex, setHistoryIndex, setInput);
        }
      },
      () => handleGamesSelect(gamesSelection),
      () => {
        setIsGamesMode(false);
        addToHistory('output', '^C\nExited games menu. Type any command to continue.');
      }
    );
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useScrollToBottom(consoleRef, history);
  useInputFocus(inputRef, isTyping);
  useTypingSequence(setCurrentStep);
  useGlobalKeyboardEvents(
    isGamesMode,
    isPlayingGame,
    () => handleGamesUp(gamesSelection, updateGamesDisplayCallback),
    () => handleGamesDown(gamesSelection, updateGamesDisplayCallback),
    () => handleGamesSelect(gamesSelection),
    () => {
      setIsGamesMode(false);
      addToHistory('output', '^C\nExited games menu. Type any command to continue.');
    }
  );

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <ConsoleRender
      currentStep={currentStep}
      isTyping={isTyping}
      history={history}
      isPlayingGame={isPlayingGame}
      selectedGame={selectedGame}
      isGamesMode={isGamesMode}
      input={input}
      inputRef={inputRef}
      consoleRef={consoleRef}
      onInputChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPressWrapper}
      onKeyDown={handleKeyDownWrapper}
      onStepChange={setCurrentStep}
      onTypingComplete={() => setIsTyping(false)}
      onGameExit={() => handleExitGame(setIsPlayingGame, addToHistory)}
    />
  );
}