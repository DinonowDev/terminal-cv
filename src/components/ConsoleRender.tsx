/**
 * Console Render Component
 * 
 * This component handles the rendering of the console interface including
 * the welcome message, history, and input line.
 */

import React from 'react';
import TypewriterText from './TypewriterText';
import SnakeGame from './games/SnakeGame';

// ============================================================================
// IMPORTS - Types
// ============================================================================
import { HistoryItem } from '../types/console';

// ============================================================================
// INTERFACES
// ============================================================================

interface ConsoleRenderProps {
  currentStep: number;
  isTyping: boolean;
  history: HistoryItem[];
  isPlayingGame: boolean;
  selectedGame: string;
  isGamesMode: boolean;
  input: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  consoleRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onStepChange: (step: number) => void;
  onTypingComplete: () => void;
  onGameExit: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ConsoleRender({
  currentStep,
  isTyping,
  history,
  isPlayingGame,
  selectedGame,
  isGamesMode,
  input,
  inputRef,
  consoleRef,
  onInputChange,
  onKeyPress,
  onKeyDown,
  onStepChange,
  onTypingComplete,
  onGameExit
}: ConsoleRenderProps) {
  return (
    <div className="console-container">
      <div className="console-header">
        <div className="console-buttons">
          <div className="console-button close"></div>
          <div className="console-button minimize"></div>
          <div className="console-button maximize"></div>
        </div>
        <div className="console-title">Terminal - Portfolio</div>
      </div>
      
      <div className="console-body" ref={consoleRef}>
        {/* Welcome Message */}
        {currentStep >= 1 && (
          <div className="welcome-message">
            <TypewriterText 
              text="Welcome to AmirHossein Rezaei's Portfolio Terminal"
              speed={30}
              onComplete={() => onStepChange(2)}
            />
          </div>
        )}
        
        {/* Introduction */}
        {currentStep >= 2 && (
          <div className="intro-section">
            <TypewriterText 
              text="I am a software engineer passionate about creating innovative solutions."
              speed={30}
              onComplete={() => onStepChange(3)}
            />
          </div>
        )}

        {/* Help Section */}
        {currentStep >= 3 && (
          <div className="help-section">
            <TypewriterText 
              text="Type 'help' to see available commands or start exploring!"
              speed={30}
              onComplete={() => {
                onTypingComplete();
                onStepChange(4);
              }}
            />
          </div>
        )}

        {/* History Items */}
        {history.map((item, index) => (
          <div key={index} className={`history-item ${item.type}`}>
            {item.type === 'input' ? (
              <div className="command-line">
                <span className="prompt">Dinonow@portfolio ~ %</span>
                <span className="command">{item.content}</span>
              </div>
            ) : (
              <div className="output">
                {item.content.split('\n').map((line, lineIndex) => {
                  // Check if line contains any URL
                  const urlMatch = line.match(/https?:\/\/[^\s]+/g);
                  if (urlMatch) {
                    let processedLine = line;
                    urlMatch.forEach(url => {
                      processedLine = processedLine.replace(url, `__LINK__${url}__LINK__`);
                    });
                    
                    return (
                      <div key={lineIndex}>
                        {processedLine.split('__LINK__').map((part, partIndex) => {
                          if (part.match(/^https?:\/\/[^\s]+$/)) {
                            return (
                              <a 
                                key={partIndex}
                                href={part} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline"
                              >
                                {part}
                              </a>
                            );
                          }
                          return part;
                        })}
                      </div>
                    );
                  }
                  return <div key={lineIndex}>{line}</div>;
                })}
              </div>
            )}
          </div>
        ))}

        {/* Game Component */}
        {isPlayingGame && selectedGame === 'snake' && (
          <SnakeGame onExit={onGameExit} />
        )}

        {/* Input Line */}
        {currentStep >= 4 && !isGamesMode && !isPlayingGame && (
          <div className="input-line">
            <span className="prompt">Dinonow@portfolio ~ %</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              onKeyDown={onKeyDown}
              className="console-input"
              placeholder=""
              disabled={isTyping}
            />
          </div>
        )}
      </div>
    </div>
  );
}
