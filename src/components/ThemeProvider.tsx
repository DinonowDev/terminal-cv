'use client';

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    // Console protection
    const setupConsoleProtection = () => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      const handleKeyDown = (e: KeyboardEvent) => {
        // F12
        if (e.keyCode === 123) {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
          e.preventDefault();
          return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+C (Element Inspector)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
          e.preventDefault();
          return false;
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Console detection and warning
      let devtoolsOpen = false;
      
      const threshold = 160;
      
      const devtoolsCheck = setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtoolsOpen) {
            devtoolsOpen = true;
            console.clear();
            console.log('%c🚫 Developer Tools Detected!', 'color: red; font-size: 20px; font-weight: bold;');
            console.log('%cThis portfolio is protected. Please close developer tools.', 'color: red; font-size: 14px;');
            console.log('%cIf you are a developer, you can view the source code at: https://github.com/DinonowDev?tab=repositories', 'color: blue; font-size: 12px;');
          }
        } else {
          devtoolsOpen = false;
        }
      }, 500);
      
      // Store original console methods
      const originalConsole = {
        log: console.log.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        info: console.info.bind(console),
        debug: console.debug.bind(console),
        trace: console.trace.bind(console),
        table: console.table.bind(console),
        group: console.group.bind(console),
        groupEnd: console.groupEnd.bind(console),
        time: console.time.bind(console),
        timeEnd: console.timeEnd.bind(console),
        count: console.count.bind(console),
        clear: console.clear.bind(console),
        assert: console.assert.bind(console),
        countReset: console.countReset.bind(console),
        dir: console.dir.bind(console),
        dirxml: console.dirxml.bind(console),
        groupCollapsed: console.groupCollapsed.bind(console),
        profile: console.profile.bind(console),
        profileEnd: console.profileEnd.bind(console)
      };
      
      const protectedLog = function() {
        originalConsole.clear();
        originalConsole.log('%c🚫 Access Denied!', 'color: red; font-size: 20px; font-weight: bold;');
        originalConsole.log('%cThis portfolio is protected. Please close developer tools.', 'color: red; font-size: 14px;');
      };
      
      // Override console methods safely
      console.log = protectedLog;
      console.warn = protectedLog;
      console.error = protectedLog;
      console.info = protectedLog;
      console.debug = protectedLog;
      console.trace = protectedLog;
      console.table = protectedLog;
      console.group = protectedLog;
      console.groupEnd = protectedLog;
      console.time = protectedLog;
      console.timeEnd = protectedLog;
      console.count = protectedLog;
      console.clear = function() {};
      console.assert = protectedLog;
      console.countReset = protectedLog;
      console.dir = protectedLog;
      console.dirxml = protectedLog;
      console.groupCollapsed = protectedLog;
      console.profile = protectedLog;
      console.profileEnd = protectedLog;

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearInterval(devtoolsCheck);
        // Restore original console methods
        console.log = originalConsole.log;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
        console.info = originalConsole.info;
        console.debug = originalConsole.debug;
        console.trace = originalConsole.trace;
        console.table = originalConsole.table;
        console.group = originalConsole.group;
        console.groupEnd = originalConsole.groupEnd;
        console.time = originalConsole.time;
        console.timeEnd = originalConsole.timeEnd;
        console.count = originalConsole.count;
        console.clear = originalConsole.clear;
        console.assert = originalConsole.assert;
        console.countReset = originalConsole.countReset;
        console.dir = originalConsole.dir;
        console.dirxml = originalConsole.dirxml;
        console.groupCollapsed = originalConsole.groupCollapsed;
        console.profile = originalConsole.profile;
        console.profileEnd = originalConsole.profileEnd;
      };
    };

    // Theme management
    const setupTheme = () => {
      const themes = {
        'light': { bg: '#ffffff', text: '#000000', prompt: '#0066cc' },
        'dark': { bg: '#000000', text: '#ffffff', prompt: '#00ff00' },
        'green': { bg: '#000000', text: '#00ff00', prompt: '#00ff00' },
        'blue': { bg: '#000011', text: '#0088ff', prompt: '#0088ff' },
        'purple': { bg: '#110011', text: '#cc00cc', prompt: '#cc00cc' },
        'red': { bg: '#110000', text: '#ff4444', prompt: '#ff4444' },
        'orange': { bg: '#1a0f00', text: '#ffaa33', prompt: '#ffaa33' },
        'cyan': { bg: '#001a1a', text: '#00ffff', prompt: '#00ffff' }
      };
      
      // Load saved theme
      const savedThemeId = localStorage.getItem('portfolio-theme') || 'dark';
      const theme = themes[savedThemeId as keyof typeof themes] || themes.dark;
      
      // Apply theme immediately
      document.documentElement.style.setProperty('--terminal-bg', theme.bg);
      document.documentElement.style.setProperty('--foreground', theme.text);
      document.documentElement.style.setProperty('--prompt-color', theme.prompt);
      document.documentElement.style.setProperty('--background', theme.bg);
      
      // Load custom colors
      const savedTextColor = localStorage.getItem('portfolio-color-text');
      const savedBgColor = localStorage.getItem('portfolio-color-bg');
      const savedPromptColor = localStorage.getItem('portfolio-color-prompt');
      
      if (savedTextColor) document.documentElement.style.setProperty('--foreground', savedTextColor);
      if (savedBgColor) {
        document.documentElement.style.setProperty('--terminal-bg', savedBgColor);
        document.documentElement.style.setProperty('--background', savedBgColor);
      }
      if (savedPromptColor) document.documentElement.style.setProperty('--prompt-color', savedPromptColor);
      
      // Load font size and opacity
      const savedFontSize = localStorage.getItem('portfolio-font-size');
      const savedOpacity = localStorage.getItem('portfolio-opacity');
      
      if (savedFontSize) document.documentElement.style.setProperty('--font-size', savedFontSize + 'px');
      if (savedOpacity) document.documentElement.style.setProperty('--opacity', savedOpacity);
    };

    // Setup both protection and theme
    const cleanup = setupConsoleProtection();
    setupTheme();

    return cleanup;
  }, []);

  return null;
}
