/**
 * Theme Helper Utilities
 * 
 * This file contains utility functions for theme management including
 * theme changes, color customization, and settings management.
 */

import { ThemeSystem } from '../utils/themeSystem';
import { AddToHistoryFunction } from '../types/console';

// ============================================================================
// THEME CHANGE UTILITIES
// ============================================================================

/**
 * Handles theme changes using the theme system
 * @param theme - The theme ID to change to
 * @param themeSystem - The theme system instance
 * @param addToHistory - Function to add items to history
 */
export const handleThemeChange = (
  theme: string,
  themeSystem: ThemeSystem,
  addToHistory: AddToHistoryFunction
) => {
  if (themeSystem.setTheme(theme)) {
    addToHistory('output', `Theme changed to: ${theme}`);
  } else {
    const availableThemes = themeSystem.getAvailableThemes().map((t: { id: string }) => t.id).join(', ');
    addToHistory('output', `Unknown theme: ${theme}\nAvailable themes: ${availableThemes}`);
  }
};

/**
 * Handles color changes using the theme system
 * @param type - The color type (text, bg, prompt)
 * @param color - The color name to change to
 * @param themeSystem - The theme system instance
 * @param addToHistory - Function to add items to history
 */
export const handleColorChange = (
  type: string,
  color: string,
  themeSystem: ThemeSystem,
  addToHistory: AddToHistoryFunction
) => {
  if (themeSystem.setColor(type as 'text' | 'bg' | 'prompt', color)) {
    addToHistory('output', `${type} color changed to: ${color}`);
  } else {
    const availableColors = themeSystem.getAvailableColors().map((c: { name: string }) => c.name).join(', ');
    addToHistory('output', `Invalid color: ${color}\nAvailable colors: ${availableColors}`);
  }
};

/**
 * Handles font size changes using the theme system
 * @param size - The font size as a string
 * @param themeSystem - The theme system instance
 * @param addToHistory - Function to add items to history
 */
export const handleFontSizeChange = (
  size: string,
  themeSystem: ThemeSystem,
  addToHistory: AddToHistoryFunction
) => {
  const fontSize = parseInt(size);
  if (themeSystem.setFontSize(fontSize)) {
    addToHistory('output', `Font size changed to: ${fontSize}px`);
  } else {
    addToHistory('output', 'Font size must be between 12 and 24');
  }
};

/**
 * Handles opacity changes using the theme system
 * @param opacity - The opacity value as a string
 * @param themeSystem - The theme system instance
 * @param addToHistory - Function to add items to history
 */
export const handleOpacityChange = (
  opacity: string,
  themeSystem: ThemeSystem,
  addToHistory: AddToHistoryFunction
) => {
  const opacityValue = parseFloat(opacity);
  if (themeSystem.setOpacity(opacityValue)) {
    addToHistory('output', `Opacity changed to: ${opacityValue}`);
  } else {
    addToHistory('output', 'Opacity must be between 0.1 and 1.0');
  }
};

/**
 * Resets all theme settings to default
 * @param themeSystem - The theme system instance
 * @param addToHistory - Function to add items to history
 */
export const handleReset = (
  themeSystem: ThemeSystem,
  addToHistory: AddToHistoryFunction
) => {
  themeSystem.reset();
  addToHistory('output', 'Settings reset to default');
};

// ============================================================================
// THEME VALIDATION UTILITIES
// ============================================================================

/**
 * Validates if a theme ID exists
 * @param themeId - The theme ID to validate
 * @param themeSystem - The theme system instance
 * @returns True if theme exists, false otherwise
 */
export const isValidTheme = (themeId: string, themeSystem: ThemeSystem): boolean => {
  return themeSystem.validateThemeId(themeId);
};

/**
 * Validates if a color name exists
 * @param colorName - The color name to validate
 * @param themeSystem - The theme system instance
 * @returns True if color exists, false otherwise
 */
export const isValidColor = (colorName: string, themeSystem: ThemeSystem): boolean => {
  return themeSystem.validateColorName(colorName);
};

/**
 * Gets available themes as a formatted string
 * @param themeSystem - The theme system instance
 * @returns Formatted string of available themes
 */
export const getAvailableThemesString = (themeSystem: ThemeSystem): string => {
  return themeSystem.getAvailableThemes().map((t: { id: string }) => t.id).join(', ');
};

/**
 * Gets available colors as a formatted string
 * @param themeSystem - The theme system instance
 * @returns Formatted string of available colors
 */
export const getAvailableColorsString = (themeSystem: ThemeSystem): string => {
  return themeSystem.getAvailableColors().map((c: { name: string }) => c.name).join(', ');
};
