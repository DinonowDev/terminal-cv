'use client';

import Console from './Console';
import { CommandSystem } from '../utils/commandSystem';

export default function ConsolePortfolio() {
  const commandSystem = new CommandSystem();
  const commands = commandSystem.getAllCommands();

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Console commands={commands} />
    </div>
  );
}