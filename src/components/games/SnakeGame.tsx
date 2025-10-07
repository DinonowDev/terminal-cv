'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SnakeGameProps {
  onExit: () => void;
}

export default function SnakeGame({ onExit }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const gameRef = useRef<{ resetGame: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Game variables
    const grid = 16;
    let count = 0;

    const snake = {
      x: 160,
      y: 160,
      dx: grid,
      dy: 0,
      cells: [] as { x: number; y: number }[],
      maxCells: 4
    };

    const apple = {
      x: 320,
      y: 320
    };

    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const resetGame = () => {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;
      setScore(0);
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    };

    const gameLoop = () => {
      requestAnimationFrame(gameLoop);

      // Slow game loop to 10 fps instead of 60 (60/10 = 6)
      if (++count < 6) {
        return;
      }

      count = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Move snake by its velocity
      snake.x += snake.dx;
      snake.y += snake.dy;

      // Wrap snake position horizontally on edge of screen
      if (snake.x < 0) {
        snake.x = canvas.width - grid;
      } else if (snake.x >= canvas.width) {
        snake.x = 0;
      }

      // Wrap snake position vertically on edge of screen
      if (snake.y < 0) {
        snake.y = canvas.height - grid;
      } else if (snake.y >= canvas.height) {
        snake.y = 0;
      }

      // Keep track of where snake has been. front of the array is always the head
      snake.cells.unshift({ x: snake.x, y: snake.y });

      // Remove cells as we move away from them
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      // Draw apple (circle)
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(apple.x + grid/2, apple.y + grid/2, (grid - 1)/2, 0, 2 * Math.PI);
      context.fill();

      // Draw snake one cell at a time
      // Get theme color from CSS variables
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#ffffff';
      context.fillStyle = themeColor;
      snake.cells.forEach((cell, index) => {
        // Drawing 1 px smaller than the grid creates a grid effect in the snake body
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Snake ate apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          setScore(prev => prev + 10);

          // Canvas is 400x400 which is 25x25 grids
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }

        // Check collision with all cells after this one
        for (let i = index + 1; i < snake.cells.length; i++) {
          // Snake occupies same space as a body part. reset game
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            resetGame();
          }
        }
      });
    };

    // Store game reference
    gameRef.current = { resetGame };

    // Start the game
    gameLoop();

    // Keyboard event listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent snake from backtracking on itself
      if (e.which === 37 && snake.dx === 0) { // Left arrow
        snake.dx = -grid;
        snake.dy = 0;
      } else if (e.which === 38 && snake.dy === 0) { // Up arrow
        snake.dy = -grid;
        snake.dx = 0;
      } else if (e.which === 39 && snake.dx === 0) { // Right arrow
        snake.dx = grid;
        snake.dy = 0;
      } else if (e.which === 40 && snake.dy === 0) { // Down arrow
        snake.dy = grid;
        snake.dx = 0;
      } else if (e.key === 'r' || e.key === 'R') { // Restart
        e.preventDefault();
        resetGame();
      } else if (e.key === 'q' || e.key === 'Q' || (e.ctrlKey && e.key === 'c')) { // Quit
        e.preventDefault();
        onExit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);

  return (
    <div className="snake-game">
      <div className="game-header">
        <p>🐍 Snake Game</p>
      </div>
      <div className="game-score">
        Score: {score}
      </div>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: '1px solid white', background: 'black' }}
      />
      <div className="game-controls">
        <p>Controls: ↑↓←→ to move, R to restart, Q or Ctrl+C to quit</p>
      </div>
    </div>
  );
}
