/**
 * Arrow Selection Utility
 * 
 * This utility provides a dynamic arrow navigation system for menu selection.
 * It supports keyboard navigation with arrow keys, selection, and exit functionality.
 * Perfect for games menus, file selection, and any interactive list navigation.
 */

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Represents a selectable item in the arrow navigation menu
 * @interface SelectableItem
 */
export interface SelectableItem {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item */
  name: string;
  /** Optional description for the item */
  description?: string;
  /** Optional action to execute when item is selected */
  action?: () => void;
}

/**
 * Configuration object for arrow selection menu
 * @interface ArrowSelectionConfig
 */
export interface ArrowSelectionConfig {
  /** Array of selectable items */
  items: SelectableItem[];
  /** Callback function when an item is selected */
  onSelect: (item: SelectableItem) => void;
  /** Optional callback function when exiting the menu */
  onExit?: () => void;
  /** Title displayed at the top of the menu */
  title: string;
  /** Instructions displayed to the user */
  instructions: string;
}

// ============================================================================
// ARROW SELECTION CLASS
// ============================================================================

/**
 * ArrowSelection Class
 * 
 * Provides dynamic arrow navigation for menu systems.
 * Supports keyboard navigation, selection, and customizable display.
 */
export class ArrowSelection {
  // ============================================================================
  // PRIVATE PROPERTIES
  // ============================================================================
  
  /** Array of selectable items */
  private items: SelectableItem[];
  /** Current selected index */
  private currentIndex: number = 0;
  /** Callback function for item selection */
  private onSelect: (item: SelectableItem) => void;
  /** Optional callback function for exit */
  private onExit?: () => void;
  /** Menu title */
  private title: string;
  /** Menu instructions */
  private instructions: string;

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================

  /**
   * Creates a new ArrowSelection instance
   * @param config - Configuration object for the selection menu
   */
  constructor(config: ArrowSelectionConfig) {
    this.items = config.items;
    this.onSelect = config.onSelect;
    this.onExit = config.onExit;
    this.title = config.title;
    this.instructions = config.instructions;
  }

  // ============================================================================
  // NAVIGATION METHODS
  // ============================================================================

  /**
   * Gets the current selected index
   * @returns Current index number
   */
  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Gets the currently selected item
   * @returns Current selected item
   */
  public getCurrentItem(): SelectableItem {
    return this.items[this.currentIndex];
  }

  /**
   * Moves selection up (previous item)
   * Wraps to last item if at the beginning
   */
  public moveUp(): void {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
  }

  /**
   * Moves selection down (next item)
   * Wraps to first item if at the end
   */
  public moveDown(): void {
    this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
  }

  /**
   * Selects the current item and triggers the onSelect callback
   */
  public select(): void {
    if (this.items[this.currentIndex]) {
      this.onSelect(this.items[this.currentIndex]);
    }
  }

  /**
   * Exits the selection menu and triggers the onExit callback
   */
  public exit(): void {
    if (this.onExit) {
      this.onExit();
    }
  }

  // ============================================================================
  // DISPLAY METHODS
  // ============================================================================

  /**
   * Generates the formatted display text for the menu
   * @returns Formatted string ready for display
   */
  public getDisplayText(): string {
    const itemsList = this.items.map((item, index) => {
      const isSelected = index === this.currentIndex;
      const prefix = isSelected ? '>' : ' ';
      const name = item.name.padEnd(21);
      const description = item.description || '';
      return `  ${prefix} ${name} - ${description}`;
    }).join('\n');

    return `${this.title}\n=====================================\n\n${this.instructions}\n\n${itemsList}\n\n🎯 Navigation:\n  ↑/↓ Arrow Keys        - Navigate between options\n  Enter                 - Select option\n  Ctrl+C                - Exit menu\n\nReady to select? Use arrow keys to navigate!`;
  }

  // ============================================================================
  // ITEM MANAGEMENT METHODS
  // ============================================================================

  /**
   * Gets all items in the selection
   * @returns Array of all selectable items
   */
  public getItems(): SelectableItem[] {
    return this.items;
  }

  /**
   * Finds an item by its ID
   * @param id - The ID to search for
   * @returns The found item or undefined
   */
  public getItemById(id: string): SelectableItem | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * Adds a new item to the selection
   * @param item - The item to add
   */
  public addItem(item: SelectableItem): void {
    this.items.push(item);
  }

  /**
   * Removes an item from the selection by ID
   * @param id - The ID of the item to remove
   */
  public removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = Math.max(0, this.items.length - 1);
    }
  }

  /**
   * Updates an existing item with new properties
   * @param id - The ID of the item to update
   * @param updates - Partial object with properties to update
   */
  public updateItem(id: string, updates: Partial<SelectableItem>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
    }
  }
}
