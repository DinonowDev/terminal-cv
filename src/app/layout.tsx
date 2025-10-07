import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AmirHossein Rezaei - Portfolio Terminal",
  description: "Interactive console-style portfolio of AmirHossein Rezaei - Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Console protection
                  (function() {
                    'use strict';
                    
                    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                    document.addEventListener('keydown', function(e) {
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
                    });
                    
                    // Disable right-click context menu
                    document.addEventListener('contextmenu', function(e) {
                      e.preventDefault();
                      return false;
                    });
                    
                    // Disable text selection
                    document.addEventListener('selectstart', function(e) {
                      e.preventDefault();
                      return false;
                    });
                    
                    // Disable drag
                    document.addEventListener('dragstart', function(e) {
                      e.preventDefault();
                      return false;
                    });
                    
                    // Console detection and warning
                    let devtools = {
                      open: false,
                      orientation: null
                    };
                    
                    const threshold = 160;
                    
                    setInterval(function() {
                      if (window.outerHeight - window.innerHeight > threshold || 
                          window.outerWidth - window.innerWidth > threshold) {
                        if (!devtools.open) {
                          devtools.open = true;
                          console.clear();
                          console.log('%c🚫 Developer Tools Detected!', 'color: red; font-size: 20px; font-weight: bold;');
                          console.log('%cThis portfolio is protected. Please close developer tools.', 'color: red; font-size: 14px;');
                          console.log('%cIf you are a developer, you can view the source code at: https://github.com/DinonowDev?tab=repositories', 'color: blue; font-size: 12px;');
                        }
                      } else {
                        devtools.open = false;
                      }
                    }, 500);
                    
                    // Override console methods
                    const originalLog = console.log;
                    const originalWarn = console.warn;
                    const originalError = console.error;
                    const originalInfo = console.info;
                    
                    console.log = function() {
                      console.clear();
                      console.log('%c🚫 Access Denied!', 'color: red; font-size: 20px; font-weight: bold;');
                      console.log('%cThis portfolio is protected. Please close developer tools.', 'color: red; font-size: 14px;');
                    };
                    
                    console.warn = console.log;
                    console.error = console.log;
                    console.info = console.log;
                    
                    // Disable common debugging methods
                    window.console = {
                      log: console.log,
                      warn: console.log,
                      error: console.log,
                      info: console.log,
                      debug: console.log,
                      trace: console.log,
                      table: console.log,
                      group: console.log,
                      groupEnd: console.log,
                      time: console.log,
                      timeEnd: console.log,
                      count: console.log,
                      clear: function() {}
                    };
                  })();
                  
                  // Define themes
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
                  const theme = themes[savedThemeId] || themes.dark;
                  
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
                } catch (e) {
                  // Ignore errors
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
