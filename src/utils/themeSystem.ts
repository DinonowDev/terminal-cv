/**
 * Theme System Utility
 * 
 * This utility provides dynamic theme management for the console interface.
 * It handles theme switching, color customization, font settings, and opacity controls.
 * All themes and colors are data-driven and easily extensible.
 */

// ============================================================================
// IMPORTS - Data
// ============================================================================
import { themes, colors } from '../data/portfolioData';

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Represents a theme configuration
 * @interface ThemeConfig
 */
export interface ThemeConfig {
  /** Unique theme identifier */
  id: string;
  /** Human-readable theme name */
  name: string;
  /** Color configuration for the theme */
  colors: {
    /** Background color */
    bg: string;
    /** Text color */
    text: string;
    /** Prompt color */
    prompt: string;
  };
}

/**
 * Represents a color configuration
 * @interface ColorConfig
 */
export interface ColorConfig {
  /** Color name */
  name: string;
  /** Color hex value */
  value: string;
}

// ============================================================================
// THEME SYSTEM CLASS
// ============================================================================

/**
 * ThemeSystem Class
 * 
 * Manages all theme-related functionality including theme switching,
 * color customization, font settings, and opacity controls.
 */
export class ThemeSystem {
  // ============================================================================
  // PRIVATE PROPERTIES
  // ============================================================================
  
  /** Currently active theme */
  private currentTheme: ThemeConfig;
  /** Map of custom color overrides */
  private customColors: Map<string, string> = new Map();

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================

  /**
   * Creates a new ThemeSystem instance and applies the default theme
   */
  constructor() {
    this.currentTheme = themes[1]; // Default to dark theme
    // Only apply theme if we're in the browser
    if (typeof document !== 'undefined') {
      this.applyTheme(this.currentTheme);
    }
  }

  // ============================================================================
  // THEME GETTERS
  // ============================================================================

  /**
   * Gets the currently active theme
   * @returns Current theme configuration
   */
  public getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  /**
   * Gets all available themes
   * @returns Array of all available theme configurations
   */
  public getAvailableThemes(): ThemeConfig[] {
    return themes;
  }

  /**
   * Gets all available colors
   * @returns Array of all available color configurations
   */
  public getAvailableColors(): ColorConfig[] {
    return colors;
  }

  // ============================================================================
  // THEME SETTERS
  // ============================================================================

  /**
   * Sets the active theme by ID
   * @param themeId - The ID of the theme to set
   * @returns True if theme was set successfully, false otherwise
   */
  public setTheme(themeId: string): boolean {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme = theme;
      if (typeof document !== 'undefined') {
        this.applyTheme(theme);
      }
      return true;
    }
    return false;
  }

  /**
   * Sets a custom color for a specific element type
   * @param type - The type of element to color (text, bg, prompt)
   * @param colorName - The name of the color to apply
   * @returns True if color was set successfully, false otherwise
   */
  public setColor(type: 'text' | 'bg' | 'prompt', colorName: string): boolean {
    const color = colors.find(c => c.name === colorName);
    if (color) {
      this.customColors.set(type, color.value);
      if (typeof document !== 'undefined') {
        this.applyColor(type, color.value);
      }
      return true;
    }
    return false;
  }

  /**
   * Sets the font size for the console
   * @param size - Font size in pixels (12-24)
   * @returns True if font size was set successfully, false otherwise
   */
  public setFontSize(size: number): boolean {
    if (size >= 12 && size <= 24) {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--font-size', `${size}px`);
      }
      return true;
    }
    return false;
  }

  /**
   * Sets the opacity for the console
   * @param opacity - Opacity value (0.1-1.0)
   * @returns True if opacity was set successfully, false otherwise
   */
  public setOpacity(opacity: number): boolean {
    if (opacity >= 0.1 && opacity <= 1.0) {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--opacity', opacity.toString());
      }
      return true;
    }
    return false;
  }

  // ============================================================================
  // THEME MANAGEMENT
  // ============================================================================

  /**
   * Resets all theme settings to default values
   * Removes all custom properties and applies default theme
   */
  public reset(): void {
    if (typeof document !== 'undefined') {
      // Remove all custom properties
      document.documentElement.style.removeProperty('--terminal-bg');
      document.documentElement.style.removeProperty('--foreground');
      document.documentElement.style.removeProperty('--prompt-color');
      document.documentElement.style.removeProperty('--font-size');
      document.documentElement.style.removeProperty('--opacity');
    }
    
    // Reset to default theme
    this.currentTheme = themes[1]; // Dark theme
    this.customColors.clear();
    if (typeof document !== 'undefined') {
      this.applyTheme(this.currentTheme);
    }
  }

  /**
   * Adds a custom theme to the available themes
   * @param theme - The theme configuration to add
   */
  public addCustomTheme(theme: ThemeConfig): void {
    themes.push(theme);
  }

  /**
   * Removes a custom theme from available themes
   * @param themeId - The ID of the theme to remove
   * @returns True if theme was removed successfully, false otherwise
   */
  public removeCustomTheme(themeId: string): boolean {
    const index = themes.findIndex(t => t.id === themeId);
    if (index > 6) { // Only allow removal of custom themes (after the default 7)
      themes.splice(index, 1);
      return true;
    }
    return false;
  }

  // ============================================================================
  // THEME UTILITIES
  // ============================================================================

  /**
   * Gets a theme by its ID
   * @param themeId - The ID of the theme to find
   * @returns Theme configuration or undefined if not found
   */
  public getThemeById(themeId: string): ThemeConfig | undefined {
    return themes.find(t => t.id === themeId);
  }

  /**
   * Gets a color by its name
   * @param colorName - The name of the color to find
   * @returns Color configuration or undefined if not found
   */
  public getColorByName(colorName: string): ColorConfig | undefined {
    return colors.find(c => c.name === colorName);
  }

  /**
   * Validates if a color name exists
   * @param colorName - The color name to validate
   * @returns True if color exists, false otherwise
   */
  public validateColorName(colorName: string): boolean {
    return colors.some(c => c.name === colorName);
  }

  /**
   * Validates if a theme ID exists
   * @param themeId - The theme ID to validate
   * @returns True if theme exists, false otherwise
   */
  public validateThemeId(themeId: string): boolean {
    return themes.some(t => t.id === themeId);
  }

  // ============================================================================
  // DISPLAY UTILITIES
  // ============================================================================

  /**
   * Gets formatted display text for theme settings
   * @returns Formatted string with all theme options and instructions
   */
  public getThemeDisplayText(): string {
    return `
🎨 Available Themes:
${themes.map(theme => `  theme ${theme.id.padEnd(10)} - Switch to ${theme.name.toLowerCase()} theme`).join('\n')}

🔧 Color Customization:
  color text <color>     - Change text color
  color bg <color>       - Change background color
  color prompt <color>   - Change prompt color

📋 Available Colors:
  ${colors.map(c => c.name).join(', ')}

💡 Examples:
  theme dark
  color text green
  color bg black
  color prompt cyan

⚙️ Other Settings:
  font size <number>     - Change font size (12-24)
  opacity <number>       - Change opacity (0.1-1.0)
  reset                  - Reset to default settings

Type any setting command to apply changes!
    `.trim();
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Applies a theme to the document
   * @param theme - The theme configuration to apply
   */
  private applyTheme(theme: ThemeConfig): void {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--terminal-bg', theme.colors.bg);
      document.documentElement.style.setProperty('--foreground', theme.colors.text);
      document.documentElement.style.setProperty('--prompt-color', theme.colors.prompt);
    }
  }

  /**
   * Applies a custom color to a specific element type
   * @param type - The type of element to color
   * @param colorValue - The color value to apply
   */
  private applyColor(type: string, colorValue: string): void {
    if (typeof document !== 'undefined') {
      if (type === 'text') {
        document.documentElement.style.setProperty('--foreground', colorValue);
      } else if (type === 'bg') {
        document.documentElement.style.setProperty('--terminal-bg', colorValue);
      } else if (type === 'prompt') {
        document.documentElement.style.setProperty('--prompt-color', colorValue);
      }
    }
  }
}
