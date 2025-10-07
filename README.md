# 🚀 Terminal Portfolio - AmirHossein Rezaei

A modern, interactive terminal-style portfolio built with Next.js 14, TypeScript, and React. Experience a unique command-line interface that showcases professional experience, projects, and skills through an immersive terminal environment.

## ✨ Features

- **🖥️ Interactive Terminal Interface** - Full command-line experience with typing effects
- **🎮 Built-in Games** - Play Snake game directly in the terminal
- **🎨 Dynamic Themes** - Multiple terminal themes with customizable colors
- **📁 File System Simulation** - Browse experiences and projects like a real file system
- **⌨️ Keyboard Navigation** - Arrow key navigation and tab completion
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🔧 TypeScript** - Full type safety and excellent developer experience

## 🛠️ Technologies Used

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and better development experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Dynamic theming system
- **Custom Fonts** - Monospace terminal fonts

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation
- **Git** - Version control

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with global styles
│   └── page.tsx                 # Home page component
├── components/                   # React Components
│   ├── Console.tsx              # Main console component (275 lines)
│   ├── ConsolePortfolio.tsx     # Portfolio wrapper component (12 lines)
│   ├── ConsoleRender.tsx        # Console rendering logic (180 lines)
│   ├── TypewriterText.tsx       # Typing animation component
│   └── games/
│       └── SnakeGame.tsx        # Snake game component (183 lines)
├── constants/                    # Static Content & Command Handlers
│   ├── basicCommandHandlers.ts  # Basic commands (help, about, contact, resume)
│   └── dataCommandHandlers.ts   # Data-driven commands (experience, projects, games)
├── data/                         # Data Files
│   └── portfolioData.ts         # All portfolio data (experiences, projects, games, themes)
├── helpers/                      # Utility Functions
│   ├── consoleHelpers.ts        # Console operations and utilities
│   ├── gameHelpers.ts          # Game management and selection
│   ├── keyboardHandlers.ts     # Keyboard event handling
│   └── themeHelpers.ts         # Theme management utilities
├── hooks/                        # React Hooks
│   └── consoleEffects.ts        # Console effects and lifecycle hooks
├── types/                        # TypeScript Type Definitions
│   ├── console.ts               # Console component types
│   └── portfolio.ts             # Portfolio data types
└── utils/                        # Core System Utilities
    ├── arrowSelection.ts         # Arrow navigation system
    ├── commandSystem.ts          # Command management system
    └── themeSystem.ts           # Theme management system
```

## 🎯 Key Components Explained

### Core Console System
- **`Console.tsx`** - Main terminal component with state management
- **`ConsolePortfolio.tsx`** - Lightweight wrapper that initializes the command system
- **`ConsoleRender.tsx`** - Handles all rendering logic to keep Console.tsx clean

### Command System
- **`commandSystem.ts`** - Central command registry and execution engine
- **`basicCommandHandlers.ts`** - Static command handlers (help, about, contact, resume)
- **`dataCommandHandlers.ts`** - Dynamic command handlers for portfolio data

### Navigation & Interaction
- **`arrowSelection.ts`** - Reusable arrow key navigation system
- **`keyboardHandlers.ts`** - Comprehensive keyboard event handling
- **`consoleEffects.ts`** - React hooks for console behavior

### Theme System
- **`themeSystem.ts`** - Complete theme management with colors, fonts, and opacity
- **`themeHelpers.ts`** - Theme-related utility functions

### Game System
- **`gameHelpers.ts`** - Game selection and management utilities
- **`SnakeGame.tsx`** - Fully functional Snake game component

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Available Commands

### Basic Commands
- `help` - Show all available commands
- `about` - Learn about AmirHossein Rezaei
- `contact` - Contact information
- `resume` - Download resume
- `clear` - Clear terminal
- `exit` - Close terminal

### Data Commands
- `experience` - List work experience
- `projects` - Show featured projects
- `games` - Play terminal games
- `settings` - Terminal customization

### Navigation
- Use **arrow keys** to navigate menus
- **Tab** for command completion
- **Enter** to execute commands
- **Ctrl+C** to exit games/menus

## 🎨 Customization

### Themes
The portfolio supports multiple terminal themes:
- **Default** - Classic terminal look
- **Dark** - Modern dark theme
- **Light** - Clean light theme
- **Neon** - Cyberpunk-style theme

### Colors
Customize terminal colors:
- Text color
- Background color  
- Prompt color

### Settings
- Font size adjustment
- Opacity control
- Theme switching

## 📊 Code Quality

### File Size Management
- All files are kept under **300 lines**
- Functions extracted to utility files
- Comprehensive commenting system
- Type safety throughout

### Code Organization
- **Modular architecture** - Each system in its own file
- **Type definitions** - Separate type files for better organization
- **Helper functions** - Extracted to dedicated utility files
- **React hooks** - Separated into hooks directory

### Documentation
- **JSDoc comments** - Comprehensive documentation for all functions
- **Type annotations** - Full TypeScript coverage
- **Code categorization** - Organized imports and sections

## 🏗️ Architecture Patterns

### Command Pattern
The portfolio uses a command pattern for handling user interactions:
```typescript
interface Command {
  name: string;
  description: string;
  action: (addToHistory: AddToHistoryFunction) => void;
  category?: string;
  aliases?: string[];
}
```

### Observer Pattern
React hooks provide reactive state management:
- `useState` for local state
- `useEffect` for side effects
- `useCallback` for performance optimization

### Factory Pattern
Dynamic command creation based on data:
- Experience commands generated from data
- Project commands created dynamically
- Game commands built from game list

## 🎯 Performance Optimizations

- **Code splitting** - Components loaded on demand
- **Memoization** - React.memo and useMemo for expensive operations
- **Lazy loading** - Games loaded only when needed
- **Efficient re-renders** - Optimized state updates

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Style
- **ESLint** configuration for code quality
- **TypeScript** strict mode enabled
- **Prettier** for code formatting
- **Conventional commits** for git messages

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AmirHossein Rezaei**
- Front-end Developer
- React & Next.js Specialist
- Financial Technology Expert

## 🔗 Links

<!-- - **Portfolio**: [https://your-portfolio.com](https://your-portfolio.com) -->
- **LinkedIn**: [https://linkedin.com/in/amirhossein-rezaei](https://www.linkedin.com/in/dinonow/)
- **GitHub**: [https://github.com/amirhossein-rezaei](https://github.com/dinonowdev)

---

⭐ **Star this repository if you found it helpful!**